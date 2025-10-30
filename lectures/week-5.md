# Retrieving Data from the Web (REST APIs & Web Scraping)

### Resources
- [An introduction to APIs](https://zapier.com/resources/guides/apis) (Ch. 1–3)
- [API requests with Python](https://reqbin.com/code/python/ixa9gi7o/python-http-request-example)
- [API requests with R](https://httr2.r-lib.org/)
- [Web Scraping with R](https://r4ds.hadley.nz/webscraping)
- [Web Scraping with Python](https://realpython.com/python-web-scraping-practical-introduction/)

> Use the readings for depth. This page is a hands-on guide to what we’ll use and why.


## Overview

Two complementary ways to get data from the web:

1) **REST APIs** — standardized, documented interfaces that return structured data (often JSON).  
2) **Web scraping** — extract data directly from webpages (HTML) when no API is available.

You’ll learn how to make API requests, parse responses, handle errors/rate limits, and perform basic scraping (static pages) with pointers to tools for dynamic pages.


## REST APIs (Representational State Transfer)

REST is a **stateless** way for a **client** (your code) to request **resources** from a **server**. Requests use HTTP methods:

- `GET` (retrieve), `POST` (create), `PUT/PATCH` (update), `DELETE` (remove).  
- Responses include a **status code** (e.g., `200 OK`, `404 Not Found`, `401 Unauthorized`) and usually a **body** (JSON/XML).

### Request anatomy

- **URI**: where the resource lives (e.g., `https://api.example.com/items`).  
- **Method**: `GET`, `POST`, …  
- **Headers**: metadata (e.g., `Authorization: Bearer <token>`, `Accept: application/json`).  
- **Body**: optional payload (for `POST`/`PUT`), often JSON.

### JSON refresher

JSON is key–value oriented, easy to read/parse. You’ll typically convert it to a data frame after extracting the right fields.

### Making requests (query params, headers, auth, errors)

:::code-group
```Python
import requests
import pandas as pd

BASE = "https://api.example.com/items"
params = {"q": "widgets", "limit": 50}            # query parameters
headers = {"Accept": "application/json"}          # typical header

r = requests.get(BASE, params=params, headers=headers, timeout=30)
r.raise_for_status()                               # raises for 4xx/5xx
data = r.json()                                    # parse JSON to dict

# Flatten/normalize when appropriate
df = pd.json_normalize(data, max_level=1)
print(df.head())
```

```R
library(httr2)
library(jsonlite)
library(dplyr)

base <- "https://api.example.com/items"
req <- request(base) |>
  req_url_query(q = "widgets", limit = 50) |>
  req_headers(Accept = "application/json")

resp <- req_perform(req)
stop_for_status(resp)
data <- resp_body_json(resp, simplifyVector = TRUE)

df <- as_tibble(data)
print(head(df))
```
:::

**Bearer tokens / API keys** (never hardcode secrets in public repos!)

:::code-group
```Python
import os, requests
token = os.getenv("API_TOKEN")   # set in your env, not in code
headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}
r = requests.get("https://api.example.com/me", headers=headers, timeout=30)
```

```R
library(httr2)
token <- Sys.getenv("API_TOKEN")
req <- request("https://api.example.com/me") |>
  req_headers(Authorization = paste("Bearer", token)) |>
  req_perform()
```
:::

### Pagination

APIs often page results (e.g., `?page=2` or `next` links).

:::code-group
```Python
import requests

items = []
url = "https://api.example.com/items"
while url:
    r = requests.get(url, timeout=30)
    r.raise_for_status()
    payload = r.json()
    items.extend(payload["results"])
    url = payload.get("next")   # None when finished
```

```R
library(httr2)
library(purrr)

items <- list()
url <- "https://api.example.com/items"

while (!is.null(url)) {
  req <- request(url)
  resp <- req_perform(req)
  payload <- resp_body_json(resp, simplifyVector = TRUE)
  items <- append(items, payload$results)
  url <- payload$next %||% NULL  # requires rlang::`%||%` if you use it
}
```
:::

### Rate limiting & retries

Respect server limits (e.g., `429 Too Many Requests`).

:::code-group
```Python
import time, requests

for attempt in range(5):
    r = requests.get("https://api.example.com/items", timeout=30)
    if r.status_code == 429:
        wait = int(r.headers.get("Retry-After", "1"))
        time.sleep(wait)
        continue
    r.raise_for_status()
    break
```

```R
library(httr2)
library(purrr)

req <- request("https://api.example.com/items")
resp <- req_retry(req, max_tries = 5, backoff = ~ .x * 2) |> req_perform()
```
:::

### Example: GET the course schedule (JSON)

We can fetch a JSON resource directly (no auth).

:::code-group
```Python
import requests

URI = "https://cloud.timeedit.net/su/web/stud1/s.txt?i=x8ce6e1Z3n0wknyaQhxnYclQln_0nbZHw2QcTcn_slc9q6bsZdx0Q65y6Z078560QWQf6109Z36v08700"
response = requests.get(URI, timeout=30)
response.raise_for_status()
data = response.json()
```

```R
library(httr2)

URI <- "https://cloud.timeedit.net/su/web/stud1/s.txt?i=x8ce6e1Z3n0wknyaQhxnYclQln_0nbZHw2QcTcn_slc9q6bsZdx0Q65y6Z078560QWQf6109Z36v08700"
resp <- request(URI) |> req_perform()
stop_for_status(resp)
data <- resp_body_json(resp, simplifyVector = TRUE)
```
:::

> Convert the nested JSON to a tidy frame with `pandas.json_normalize()` or `tidyr::unnest_wider()` + `unnest_longer()` as needed.


## Web Scraping (HTML)

Scraping extracts data from HTML when no API is available.

- **Static pages**: content is in the initial HTML → parse with an HTML parser.  
- **Dynamic pages**: content loads via JavaScript after the initial request → consider a headless browser (e.g., Selenium / rvest + chromote).

### Ethics & etiquette

- Check and respect **Terms of Service** and **robots.txt**.  
- Be gentle: add delays, avoid excessive concurrency, identify your tool via headers when appropriate.  
- Don’t collect personal/sensitive data unlawfully; store only what you need.

### Minimal HTML parsing workflow

1) **Fetch** the page.  
2) **Locate** the target elements (inspect the page; find `id`/`class`/tags).  
3) **Extract** text/attributes.  
4) **Assemble** rows/columns → data frame.

### Example: table scraping (Worldometers)

:::code-group
```Python
import pandas as pd
import requests
from bs4 import BeautifulSoup

URL = "https://www.worldometers.info/world-population/population-by-country/"
r = requests.get(URL, timeout=30)
r.raise_for_status()

soup = BeautifulSoup(r.content, "html.parser")
table = soup.find("table", id="example2")

# Easiest route:
df = pd.read_html(str(table))[0]

# Or manual extraction:
# thead = table.find("thead")
# tbody = table.find("tbody")
# columns = [th.get_text(strip=True) for th in thead.find_all("th")]
# rows = [[td.get_text(strip=True) for td in tr.find_all("td")] for tr in tbody.find_all("tr")]
# df = pd.DataFrame(rows, columns=columns)
```

```R
library(rvest)
library(dplyr)
library(tidyr)

URL <- "https://www.worldometers.info/world-population/population-by-country/"
html <- read_html(URL)
table <- html |> html_element("#example2")

# Easiest route:
df <- table |> html_table()

# Or manual extraction:
# thead <- table |> html_element("thead")
# cols  <- thead |> html_elements("th") |> html_text2()
# rows  <- table |> html_element("tbody") |> html_elements("tr")
# mat   <- lapply(rows, \(tr) tr |> html_elements("td") |> html_text2())
# df    <- as.data.frame(do.call(rbind, mat), stringsAsFactors = FALSE)
# names(df) <- cols
```
:::

### Dynamic pages (heads-up)

If `view-source:` shows no data and the page fills content via JS/XHR:
- In **browser devtools → Network**, watch for secondary JSON endpoints you can `GET` directly.  
- Otherwise, use a headless browser (e.g., **Selenium** in Python; **chromote**/**playwright** in R) to render the page, then parse.


## Common pitfalls

- **Scraping a dynamic page with a static parser.** Verify where the data actually comes from.  
- **Forgetting error handling.** Always check status codes and wrap requests with retries/backoff.  
- **Ignoring pagination.** Many APIs return partial pages—loop until `next` is `NULL`.  
- **Messy JSON → DF.** Normalize the nested structures before analysis.  
- **Ethics & legality.** Respect ToS, robots.txt, and privacy laws.

## Quick practice

1. Call a public JSON API (e.g., a “countries” or “weather” endpoint). Extract a subset of fields, normalize to a data frame, and save as CSV.  
2. Implement pagination to fetch **all** results. Add polite backoff when you see `429`.  
3. Scrape a static page with an HTML table. Convert strings like `"1,234"` to integers and `"12.3 %"` to numeric.  
4. Bonus: Find a dynamic page; either discover its hidden JSON endpoint via devtools or render it with a headless browser to extract the data.
