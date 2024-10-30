# DataFrames & Visualising data with plots

## Oveview


## DataFrames

#### Reading
- [P4DA](https://wesmckinney.com/book/): chapter 5.2, parts of 7.2
- [R4DS](https://r4ds.had.co.nz/index.html): chapter 5.1-5.5

Tables are the go to structure to visualize data. They consist of columns and rows labled in a particular fashion.
A popular (and good) way of organizing data in tables is using columns e.g. Name, Age, Height, to represent
variables and rows to represent entries.

An example of a dataset ordered in a table can look as follows.

| Name                | Age | Height(cm) | Occupation | Id |
|---------------------|-----|------------|------------|----|
| Taariq Nazar        | 26  | 187        | Phd        | 0  |
| Someone Cooler      | 27  | 188        | Proffesor  | 1  |
| Someone Even Cooler | 28  | 189        | Emeritus   | 2  |
| Someone so cool     | 26  | 179        | Plumber    | 3  |

A table format of the dataset is called a `Dataframe`. In the example above, the data
consists of three entries and 4(5) variables (one does not usually count the row
number (Id) as a variable unless it is crucial part of the dataset e.g. a
special id specific to the data). A core concept of this course is how to work
with dataframes, that is, how to perform operations on dataframes. 

### Working with Dataframes
There are a set of operations you should be familiar with to work on
dataframes. These are `sorting`, `selecting`, `filtering`, `mutating` and `grouping`. Using these, you can 
create complex operations by composing the operations.

#### Sorting
Sorting is the process of ordering data by a variable or multiple variables. For
instance in the above example one might want to order the entries (rows) by
Height.

#### Selecting
Selecting, is chosing variables of interest. In most datasets, there will be an
excess of variables that are necessary for you analysis, then you would like *select* 
the variables that are necessary.

#### Filtering
Just as it is named, filtering is the process of focusing on entries that
satisfy some condition. For instance, in the above example. We might only want to look at entries that are
have `Age > 26`. 

#### Mutating
Mutating, is to change the original dataset by creating new variables which can
be functions of old variables.

#### Grouping
Grouping, is a process of aggregating data. In most cases, it is accompanied
with a following operations, for instance, `sum`, `count`, `max`. In the above
example, if we group by Age, and accompany the grouping by `count`, this will
result in a dataframe that contains the number of people in each Age-group.


The syntax for performing these operations on dataframes looks as follows
:::code-group
```Python
import pandas as pd

# The standard library for datframes in Python is Pandas
df = pd.DataFrame(data)

# Sorting 
#Set ascending False if the order you want is descending.
df.sort_values(column_name, ascending=True) 

# Selecting 
# Selecting range can be done using :
df.loc[[row1_1, row_2,...],[column_name1, column_name2,... ]] #Choose the columns of interest. 

# Filtering 
#Condition of your filter, for instance condition = df["age"]>=10 && df["age"]<20.
df.loc[condition] 

# Mutating 
# Using lambda-functions makes it easy to mutate. You can also you regular functions.
df[new_col] = df.loc[[cols_to_mutate]].apply(lambda x: x[col_1]/x[col_2])

# Grouping accompanied with count
df.groupby(cols_to_group).count()

# Example of composing operations
df 
  .loc(...)
  .apply(...)
  .groupby(...).max()
```

```R 
#In R, the operations is packaged into the `dplyr` library. The pipe operator %>%`, makes operating on dataframes very easy.
library(dplyr)

df = tibble(data)

# Sorting
#Change column_name -> desc(column_name) if you want it to be descending.
df %>% arrange(column_name, .by_group = FALSE) 

# Selecting 
# You can build complex selection methods using select(), e.g. criterion = column_name
df %>% select(criterion) 

# Filtering 
# Bulding complex filters is very simple, for instance criterion: age>=mean(age)
df %>% filter(crtierion)

# Mutating
# You can mutate the current df by using mutate()
df %>% mutate(new_col = f(column_variables))

# Grouping accompanied with count

df %>% 
  group_by(cols_to_group) %>%
  tally()

# Due to pipes, one can compose operations in a simple manner.
# Example of composing
df %>%
  select(column_1, column_5, column_2) %>%
  arrange(column_2, .by_group=FALSE) %>%
  filter(column_5 >= 10) %>%
  mutate(column_99 = column_1/column_5 * column_2. .keep="all")
```
:::

You can combine these simple operations to compose very complex ones. To find
the documentation, google "package method doucmentation". E.g.
"pandas loc documentation", the first link is usually the original
documentation and will contain indepth information for the
specific method you are searching for.

# Lecture 3 (Visualising Data: Plots)

### Reading

- [P4DA](https://wesmckinney.com/book/): chapter 9
- [R4DS](https://r4ds.had.co.nz/index.html): chapter 3

### Resources

- [Importance of
  visualisation](https://hdsr.mitpress.mit.edu/pub/zok97i7p/release/4)


## Summary 

In this lecture we will learn how to visualise data in terms of plots. We will
also look into the differences between plots and how to choose a suitable
visualisation method for a specific problem. Finally, we will conclude with and
example. This lecture will contain a less content than others.

## Visualising Data

A ~~picture~~ *plot* is worth a thousand word, is a popular phrase, that conveys
the use the power of data visualisation. This is meant to convey the message
that you can understand more from a single image than a text of words. In our
case, when we analyse plots generated from the data we will be able to draw
deeper conclusions than we would have by just looking at the data through
tables. So far that is what we have been doing. Although tables of data are
great for, initial interpretation, transformation e.t.c, it lends us no way of
understanding the data. Visualising data in forms of images(plots), gives us a
tool to analyse the data and gain a deeper understanding of it, it enables us,
in most cases, to draw far deeper conclusion of the data than would be possible
otherwise.

### Chosing the right Plot

There are many ways to represent the data, but one has to be mindfull of the
type of plot used. Choosing the right plot is an important problem we will be
faced with when visualising data. The plot should convey a conclusion that can
be drawn without ambiguity. That is why it is important to consistently use
propper labeling and descriptive captions. Seeing an image without context or
understanding will render the image uninterpretable, and in cases, lead the
viewer to draw the wrong conclusion. 

### Examples of plots 

Let's begin by creating a simple
plot of a `sin` function. We are not able to plot a continous line chart, we
need to provide a set of data points $\{(x_n,y_n)\}_{n \geq 1}$. Therefore, we
need to discretize the x-axis to be able to plot a function.

We can do this in the following way 

:::code-group
```Python
import numpy as np 
import matplotlib.pyplot as plt 

n_steps = 1000 # Size of partition of the x-axis
x = np.linspace(0, 2*np.pi, n_step) 
y = np.sin(x)
plt.plot(x,y)
plt.xlabel("x")
plt.ylabel("sin(x)")
plt.title("Line Chart of sin function")
plt.show()
```

```R 
n_steps = 1000
x <- seq(0, 2*pi, 1/n_steps)
y <- sin(x)

// Here it is always easier to work with dfs
df <- tibble(x=x,y=y)
df %>% 
    ggplot() +
    geom_path(mapping=aes(x=x, y=y)) +
    labs(title="Line Chart of sin function",
         x="x",
         y="sin(x)")
```
:::

![sin](/img/sin_example.png)

Since we want to be working with Dataframes, it would be nice to directly visualise
data from them. Thankfully, this a feature that has support in both
Python and R. To show a simple example of this we can use the
`Winter_medals2022-11-03.csv` data. 

We can visualise the number of medals won by the 3 countries with the highest
number of total medals in the following way

:::code-group
```Python
# Process data
df = pd.read_csv("./data/Winter_medals2022-11-03.csv")
top3 = df[["Country", "Total"]].groupby("Country").sum().sort_values("Total", ascending=False).head(3).index
df = df.loc[df["Country"].isin(top3)][["Country", "Gold", "Silver", "Bronze"]].groupby("Country").sum()

# Plot data, use stacked to get nicer plot.
df.plot.barh(stacked=True)
```

```R
df <- read_csv("./data/Winter_medals2022-11-03.csv")
top3 <- df %>%
        group_by(Country) %>%
        summarise(Gold=sum(Gold)) %>%
        arrange(desc(Gold)) %>%
        select(Country) %>%
        head(3)

df <- df %>% 
    filter(Country %in% top3$Country ) %>%
    group_by(Country) %>%
    summarise(Gold = sum(Gold), Silver = sum(Silver), Bronze = sum(Bronze))

df %>%
    pivot_longer(cols = -Country, names_to = "Medal", values_to = "Count") %>% # We will go through pivoting in a few lectures
    ggplot(aes(x = Count, y = Country, fill = Medal)) +
    geom_bar(stat = "identity") +
    labs(x = "Medals", y = "Country")
```
:::
![bar](/img/bar_example.png)

This is by no means comprehensive, but is meant to show you how to plot in
practice. You can find more examples in the provided reading material. We will
explore how to use plots to draw conclusions in the next plot.


