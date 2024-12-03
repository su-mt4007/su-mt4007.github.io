# Retrieving data from the web

### Resources
- [An introduction to APIs](https://zapier.com/resources/guides/apis) chapter 1-3
- [API requests with Python](https://reqbin.com/code/python/ixa9gi7o/python-http-request-example) 
- [API requests with R](https://httr2.r-lib.org/)
- [Web Scraping with R](https://r4ds.hadley.nz/webscraping)
- [Web Scraping with Python](https://realpython.com/python-web-scraping-practical-introduction/)

*You can find examples and motivation in the resources.*

## Summary

In this lecture, we will explore the core principles of REST as a communication
framework for applications and learn practical methods for working with REST
APIs, focusing on the standardized and efficient retrieval of resources through
network communication. Additionally, we will study techniques for retrieving
data from the internet, specifically web scraping. While we have examined how
REST APIs function and how to retrieve resources through them, we will also
address scenarios where data is not accessible via an API, necessitating the use
of web scraping to retrieve data visible on websites.

## REST APIs

REST (Representational State Transfer Application) APIs is a communications
framework for applications, typically, web applications. In REST the application
(requesting) resources is called the *client* and the application that responds
is called the *server*. For instance, when you are at a restaurant, you are
requesting food, which makes you the client. The restaurant serves you the food
that you have requested. That is, the restaurant responds to you request. This
makes the restaurant the server.

The REST framework specifies rules on how consitutents communicate in a network.
There are several other frameworks for communication but REST is standard. 

### The Framework 

In REST, everything is a resource. Resources are identified by unique URIs
(Uniform Resource Identifiers). The clients in the network communicate
using HTTP methods. E.g `GET` to retrieve resources, `POST` to create new
resources, `PUT` to update resources, `DELETE` to remove resources. There are
several more HTTP methods but these are the most common ones. Resources have one
or more representations, which can be in various formats such as [JSON](#json)
or [XML](#xml). 

Each request from a client to a server must contain all the information need to
understand and fulfill the request. The server doesn't store any infomation
about the client inbetween requests. This makes REST stateless communications
framework.

The idea is that everytime you make a request, you get a response containing
some resource(s). For instance, imagine we are searching for something on
google, we are in other words making a request to googles servers, and the
server responds with the search results. The REST pattern is everywhere on the
internet. The figure below illustrates this idea. 

![rest-api](https://www.altexsoft.com/static/blog-post/2023/11/72f74918-0345-4be1-bed3-08d1cfe138cc.webp)

*Image from: https://www.altexsoft.com/blog/rest-api-design/*

Before we continue on about REST APIs, we should consider why this is important
to learn. For data scientist, most of the data will be provided from an
organizations through the internet. It is highly unlikely, that you will be
handed a usb containing data files. Therefore, retrieving data in a standardised
format is essential. REST is the standard way of retrieving resources through a
network. 

Another motivation to why we should learn about REST APIs is because of the
scope of the tool. REST is an efficent way to communicate in a network and the
type of communication and network is arbitrary. In the motivation above, the
resource was data but it can be anything. For instance, smart lights communicate
using REST. We make a request from our mobile app to turn on/off a specific
light. The app sends a request to the lamp server and the resource is then a
physical action. This is how IKEA smart home works. This is just scratching the
surface of the possibilities for REST APIs.

### Request

The request has the following structure that needs to be specified. The
request consists of a

- **URI**: Specifying the location of the resource you are requesting.
- **Method**: Specifying the type of request. E.g. `GET`, `POST`, `DELETE`,
  `PUT` and so on.
- **Header**:  The headers provide additional information about the request or
  the client. The information needed is dependent on the API.
- **Body**: Optionally, data can be sent with the request, this is passed in
  the body of the request. 

### Response

The response consists of a 

- **Status**: Information of the status of the request. For instance status code
- **Header**: The header provide additional information about the response or
  the server. The information needed is dependent on the API.
- **Body**: The response consists of a body that contains the resource(s)
  requested (if request has been accepted).

### Resources

The resource is what we are after, but they can come in different types of
representations.

#### Representation 

The resource can be arbitrary but it can be of the form of some data in this
case it is usually represented in a standard format. Here are some common
formats. 

##### JSON

JavaScript Object Notation (JSON) is a lightweight data interchange format that
is easy for humans to read and write, and easy for machines to parse and
generate. JSON represents data as key-value pairs, similar to how objects are
represented in python. Each key is a string, and values can be strings, numbers,
objects, arrays, booleans, or null. See the following JSON representation of an
individual.

```json 
{
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "address": {
    "city": "Exampleville",
    "country": "JSONland"
  },
  "hobbies": ["reading", "coding", "traveling"]
}
```
Again, it is very easy to read and parse. This is a very typical representation
of a resource. 

##### XML 

eXtensible Markup Language (XML), is a markup language designed to store and transport
data. It is a flexible format that is both human-readable and machine-readable.
See the following XML representation of an individual. 
```xml
<person>
  <name>John Doe</name>
  <age>30</age>
  <isStudent>false</isStudent>
  <address>
    <city>Exampleville</city>
    <country>XMLland</country>
  </address>
  <hobbies>
    <hobby>reading</hobby>
    <hobby>coding</hobby>
    <hobby>traveling</hobby>
  </hobbies>
</person>
```
Again XML is easy to read and parse. Less common than JSON but still very
common.

### Example

The internet communicates using the REST framework. In this case the request is
a website and the response html. The browser then parses the html and shows you
the website. Under the hood, you web browser (e.g Chrome) makes a `GET` request
to some server on the network(internet) and the server responds with the code
for the website. 

Let's try to make our own request without using the browser. We can get the
course schedule information from the Time Edit page. 

The URI:
`https://cloud.timeedit.net/su/web/stud1/ri167XQQ508Z50Qv57093gZ6y3Y7806Q5Y65Y1.json`.
This is where the resource is located. Furthermore, we need to specify the
method type. In this case we are making a `GET` request.

The request 
:::code-group
```Python 
import requests 

# Making a get requests to URI
URI = "https://cloud.timeedit.net/su/web/stud1/ri167XQQ508Z50Qv57093gZ6y3Y7806Q5Y65Y1.json"
response = requests.get(URI)

data = response.json()
```

```R 
# Since R does not naturally have a similar structure to json, we need a few
more libaries to work with JSON.

library(httr2)
library(jsonlite) # Parse JSON
library(listviewer) # View Json

URI <- "https://cloud.timeedit.net/su/web/stud1/ri167XQQ508Z50Qv57093gZ6y3Y7806Q5Y65Y1.json"
request <- request(URI)
response <- req_perform(request)
json <- response %>% resp_body_string
jsonedit(json) # View the JSON in  a nice way

data <- fromJSON(json)
```
:::

The response body contains the following data:
```json 
{'columnheaders': ['Lokal',
  'Karta',
  'Kurs',
  'Kurstillfälle',
  'Delkurs, Moment',
  'Aktivitet',
  'Studentgrupp',
  'Lärare',
  'Information',
  'Litteraturinfo',
  'Tentamenssal',
  'URL',
  'Viktigt meddelande'],
 'info': {'reservationlimit': 1000, 'reservationcount': 7},
 'reservations': [{'id': '2612025',
   'startdate': '2023-12-01',
   'starttime': '13:00',
   'enddate': '2023-12-01',
   'endtime': '17:00',
   'columns': ['Lärosal 17. Albano Hus 2. Vån 2',
    'https://www.openstreetmap.org/?mlat=59.35523&mlon=18.05639#map=18/59.35523/18.05639',
    'MT4007',
    '48182. H23. 50%. DAG. NML',
    '',
    'Föreläsning',
    '',
    'Taariq Fahran Nazar',
...
```

It is a simple as that! To get the data into a nice format we need to wrangle
the raw data. This however we already know how to do.


## Web Scraping

Web scraping is the process of extracting data from websites. It involves
accessing and collecting information present in the HTML code of a webpage. This
technique provides a powerful means to gather data for analysis and research.

By scraping websites, we can retrieve information that is available on websites
but that do not have APIs open to the public. Furthermore, we can stay updated
with real-time information. This is particularly useful for tracking dynamic
data that changes frequently. For instance, weather data, stock market data as
so on.

### How to Webscrape

To efficiently perform web scraping, an understanding of basic HTML is important. 

#### HTML 

HTML, or HyperText Markup Language, serves as the backbone of the internet by
providing a standardized structure for creating and presenting content on
webpages. At its core, HTML is a markup language that uses tags to define the
structure and elements within a document. Tags encapsulate different content
elements, such as headings, paragraphs, links, images, and more. Understanding
HTML is important for effective web scraping because it allows practitioners to
navigate the structure of a webpage and precisely target the data they seek. By
understanding the hierarchy of HTML elements and their attributes, web scrapers can
programmatically access and extract relevant information. 

Read more about HTML [here](https://www.w3schools.com/html/)

#### Static vs Dynamic

Websites can be categorized as either static or dynamic. A static website
consists of fixed content that remains unchanged until manually updated, making
data extraction relatively straightforward using techniques like HTML parsing.
On the other hand, dynamic websites use technologies like JavaScript to load
content dynamically, altering the page after initial load. While static sites
may be scraped using simple HTML parsing, dynamic sites often require tools like
headless browsers (e.g., Selenium) to simulate user interactions and access
dynamically rendered content. 

In terms of REST, for static websites, we retrieve the complete website when
making a request to the server. In contrast, dynamic websites retrieve the
skeleton of the website and fills in the data using e.g JavaScript after the
fact. Since, we are only retrieving the skeleton of the website when making a
request, there is nothing to scrape, therefore the need for tool like
headless browsers to fill in the data before scraping.

In general, it is a bit more difficult to scrape dynamically rendered websites,
but not by much. The point is that we should be aware of the type of website
being scraped and use the relevant tools for the job.

### Ethical Considerations

While web scraping opens doors to a wealth of information, it's crucial to
approach it ethically. Here are some considerations:

- Always adhere to the terms of service of the website you are scraping. Some
websites explicitly prohibit scraping in their terms.

- To prevent server overload, implement rate limiting in your scraping scripts.
  This ensures you're not making too many requests in a short period, respecting
  the server's capacity.

- Robots.txt files provide guidelines for web crawlers. Check for this file on a
  website to understand any restrictions or rules set by the website owner.

## Example

To make web scraping more concrete, let's create a simple web scraper.

In the following website:

https://www.worldometers.info/world-population/population-by-country/

we can retrieve some some meta-data about countries around the world. The goal
is to create a dataframe of the data in the website. We should begin by
analysing the website. Right-click on the website and select `inspect`, this may
differ between web-browsers. Now, we can interactively anaylse the content(HTML)
of the website. For this particular website, we see that the data is in the form
of a table. So let's look for a `<table>...</table>` tag. We can see that the
data is under the table with `id="example2"`. From `<thead>...</thead>`, we get
the variable names in the `<th>...</th>` tags and from `<tbody>...</tbody>` we
get the data in the `<tr>...</tr>` tags. 

Using this, let's write some code.

The following code scrapes the website and creates a dataframe of the data:

:::code-group
```Python
import pandas as pd
import requests 
from bs4 import BeautifulSoup 
  
URL = "https://www.worldometers.info/world-population/population-by-country/"
r = requests.get(URL) 
  
html = BeautifulSoup(r.content) # If this line causes an error, run 'pip install html5lib' or install html5lib 
table = html.find("table", id="example2")

thead = table.find("thead")
tbody = table.find("tbody")

columns = []
for th in thead.find_all("th"):
    columns.append(th.text)

data = []
for tr in tbody.find_all("tr"):
    data.append(
        [td.text for td in tr.find_all("td")]
    )

df = pd.DataFrame(data, columns=columns)
# Or even more simply
#df = pd.read_html(str(table))[0] 
```

```R
library(tidyverse)
library(rvest)

URL <- "https://www.worldometers.info/world-population/population-by-country/"
html <- read_html(URL)
table <- html %>% html_elements("#example2")

thead <- table %>% html_element("thead")
tbody <- table %>% html_element("tbody")

columns <- list()
for (th in thead %>% html_elements("th")){
    columns <- append(columns, th %>% html_text2())
}

df <- data.frame()

for (tr in tbody %>% html_elements("tr")) {
    
    td_ = list()
    for (td in tr %>% html_elements("td")){
        val <- td %>% html_text2()
        td_ <- append(td_, val)
    }
    df <- rbind(df, td_)
}
colnames(df) <- columns

# Or even more simply
#df <- table %>% html_table()
```
:::

The code produces the following dataframe.

|    |   # | Country (or dependency)   | Population (2023)   | Yearly Change   | Net Change   |   Density (P/Km²) | Land Area (Km²)   | Migrants (net)   |   Fert. Rate |   Med. Age | Urban Pop %   | World Share   |
|---:|----:|:--------------------------|:--------------------|:----------------|:-------------|------------------:|:------------------|:-----------------|-------------:|-----------:|:--------------|:--------------|
|  0 |   1 | India                     | 1,428,627,663       | 0.81 %          | 11,454,490   |               481 | 2,973,190         | -486,136         |          2   |         28 | 36 %          | 17.76 %       |
|  1 |   2 | China                     | 1,425,671,352       | -0.02 %         | -215,985     |               152 | 9,388,211         | -310,220         |          1.2 |         39 | 65 %          | 17.72 %       |
|  2 |   3 | United States             | 339,996,563         | 0.50 %          | 1,706,706    |                37 | 9,147,420         | 999,700          |          1.7 |         38 | 83 %          | 4.23 %        |
|  3 |   4 | Indonesia                 | 277,534,122         | 0.74 %          | 2,032,783    |               153 | 1,811,570         | -49,997          |          2.1 |         30 | 59 %          | 3.45 %        |
|  4 |   5 | Pakistan                  | 240,485,658         | 1.98 %          | 4,660,796    |               312 | 770,880           | -165,988         |          3.3 |         21 | 35 %          | 2.99 %        |

Some processing is needed but we already know how to do that.

Try scraping websites. The best way to learn is by practice!
