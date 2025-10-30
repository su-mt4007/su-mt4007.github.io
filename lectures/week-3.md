# Exploratory Data Analysis (EDA) & Processing Data

### Resources

#### EDA 
- [P4DA](https://wesmckinney.com/book/): Chapter 13
- [R4DS](https://r4ds.had.co.nz/index.html): Chapter 7 
- [YouTube ~40 min](https://www.youtube.com/watch?v=xi0vhXFPegw&t=951s)

#### Processing Data
- [P4DA](https://wesmckinney.com/book/): Chapters 7.1–7.2
- [R4DS](https://r4ds.hadley.nz/): Chapters 5, 18
- [Dealing with outliers (motivation)](https://www.analyticsvidhya.com/blog/2021/05/detecting-and-treating-outliers-treating-the-odd-one-out/)
- [Dealing with missing data](https://www.analyticsvidhya.com/blog/2021/10/handling-missing-value/)

> Use the readings for depth; this page is a hands‑on guide you can follow directly.


## Overview 

This week is about two complementary skills:
1) **Exploratory Data Analysis (EDA):** asking systematic questions and using transformations/visualisations to answer them.  
2) **Processing data:** structuring, cleaning, and documenting decisions so later analysis is trustworthy.

Both build on Weeks 1–2 (data frames, plotting).


## Exploratory Data Analysis (EDA)

EDA means **building understanding** by iteratively asking questions and checking the data with tables/plots. Even simple commands like `head()` answer the question “what’s the structure?” Good EDA always makes the questions explicit.

> “There are no routine statistical questions, only questionable statistical routines.” — Sir David Cox  
> *(quoted in* R4DS*)*

### A practical EDA loop

1. **Pose a question.** (e.g., “Are older customers buying more?”)  
2. **Transform/select/filter** the relevant variables.  
3. **Visualise** (and/or summarise).  
4. **Interpret**: what changed in your understanding?  
5. **Decide next question** based on what you learned.

Repeat until you either answer the real question or hit the limits of the data.

### Question prompts

- **Structure**: Which variables are numeric/categorical/time? Any obvious typos or coding issues?  
- **Univariate**: What’s the distribution? Outliers? Heaviness of tails? Missingness pattern?  
- **Bivariate**: How do X and Y relate? Conditional on groups? Nonlinear patterns?  
- **Temporal**: Seasonality, trend, regime shifts, missing dates?  
- **Data quality**: Duplicates, inconsistent units, impossible values?

> Tip: Keep notes inline (Markdown near the code) so decisions are reviewable.


## Processing Data

Processing makes the dataset **tidy, consistent, and analyzable**. Do it early; it saves hours later.

### Structuring the data (tidy format)

Use the “tidy” rules:
- Each **variable** is a column.  
- Each **observation** is a row.  
- Each **value** is a single cell.

Real data rarely arrives tidy. Two common fixes are **pivoting** and **joining**.

#### Pivoting (long ↔ wide)

:::code-group
```Python
import pandas as pd

# Wide → long (like tidyr::pivot_longer)
# Example: columns 'Gold','Silver','Bronze' into rows
df_long = df.melt(id_vars=["Country"], value_vars=["Gold","Silver","Bronze"],
                  var_name="Medal", value_name="Count")

# Long → wide (like tidyr::pivot_wider)
df_wide = df_long.pivot_table(index=["Country"], columns="Medal",
                              values="Count", aggfunc="sum").reset_index()
```

```R
library(dplyr)
library(tidyr)

# Wide → long
df_long <- df %>%
  pivot_longer(cols = c(Gold, Silver, Bronze),
               names_to = "Medal", values_to = "Count")

# Long → wide
df_wide <- df_long %>%
  pivot_wider(names_from = Medal, values_from = Count, values_fn = sum)
```
:::

#### Joining (combining tables)

:::code-group
```Python
# Keys must be clean and unique (or you get row multiplication)
merged = left_df.merge(right_df, on="id", how="left")   # inner/left/right/outer
```

```R
library(dplyr)
merged <- left_df %>% left_join(right_df, by = "id")    # inner_join / full_join / right_join
```
:::

### Cleaning the data

Typical steps: standardise text/units, parse dates, handle **missing data**, and deal with **outliers**. Always **document** what you did and why.

#### Missing data

Common strategies:
- **Leave as missing** and use methods robust to NA.  
- **Drop rows/columns** (only with justification).  
- **Impute** using simple rules (mean/median/mode), grouped summaries, or model‑based methods.

:::code-group
```Python
import pandas as pd
import numpy as np

# Inspect
df.isna().sum()             # count missing per column
df["col"].isna().mean()     # fraction missing

# Simple imputations
df["x"] = df["x"].fillna(df["x"].median())              # numeric
df["cat"] = df["cat"].fillna("Unknown")                 # categorical

# Grouped imputation (e.g., fill x with group median by Country)
df["x"] = df.groupby("Country")["x"].transform(lambda s: s.fillna(s.median()))

# Drop rows with any NA in selected columns
df_clean = df.dropna(subset=["x", "y"])
```

```R
library(dplyr)
library(tidyr)

# Inspect
summarise_all(df, ~ sum(is.na(.)))    # counts per column

# Simple imputations
df <- df %>% mutate(
  x = if_else(is.na(x), median(x, na.rm = TRUE), x),
  cat = replace_na(cat, "Unknown")
)

# Grouped imputation
df <- df %>% group_by(Country) %>%
  mutate(x = if_else(is.na(x), median(x, na.rm = TRUE), x)) %>%
  ungroup()

# Drop rows with NA in selected columns
df_clean <- df %>% drop_na(x, y)
```
:::

> Rule of thumb: Impute only when you believe the imputed value is *plausible* given available information. Otherwise, prefer explicit missingness.

#### Outliers

An **outlier** differs markedly from the bulk of the data. Causes include entry errors, unit mix‑ups, rare but real events, or sampling artifacts. Detect with EDA; then decide to **keep**, **winsorise**, **transform**, or **exclude**—and record the rationale.

A simple IQR (interquartile range) rule for flagging:

:::code-group
```Python
import numpy as np

q1, q3 = df["x"].quantile([0.25, 0.75])
iqr = q3 - q1
lo, hi = q1 - 1.5*iqr, q3 + 1.5*iqr
outlier_mask = (df["x"] < lo) | (df["x"] > hi)
df["is_outlier_x"] = outlier_mask
```

```R
q1 <- quantile(df$x, 0.25, na.rm = TRUE)
q3 <- quantile(df$x, 0.75, na.rm = TRUE)
iqr <- q3 - q1
lo <- q1 - 1.5 * iqr
hi <- q3 + 1.5 * iqr
df <- df %>% mutate(is_outlier_x = x < lo | x > hi)
```
:::

> Prefer **plots** (histograms, boxplots, scatter) over rules alone—context matters.

## Common pitfalls (and fixes)

- **Silent data loss during joins/pivots.** Check row counts before/after; verify keys are unique.  
- **Implicit type coercion.** Parse dates explicitly; watch strings-as-factors (R) and object dtype (pandas).  
- **Ambiguous plots.** Always label axes, units, and filters; add a one-line caption.  
- **Undocumented cleaning.** Keep a changelog cell: what changed, why, and when.

## Quick practice

1. Take a messy CSV (wide layout). **Pivot** to tidy long form, then summarise and plot a distribution.  
2. Introduce a few NAs. Try **three** different missing-data strategies; compare the resulting mean/variance.  
3. Flag outliers with the **IQR rule**. Re‑plot with and without outliers; discuss how conclusions change.  
4. Join two small tables on a key. Validate the row count and check for unexpected many‑to‑many joins.
