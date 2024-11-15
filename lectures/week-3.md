# Week 3 Exploratory Data Analysis & Processing Data

### Resources

#### EDA 

- [P4DA](https://wesmckinney.com/book/): chapter 13
- [R4DS](https://r4ds.had.co.nz/index.html): chapter 7 
- [Youtube Video ~40 min](https://www.youtube.com/watch?v=xi0vhXFPegw&t=951s)

#### Processing Data

- [P4DA](https://wesmckinney.com/book/): chapter 7.1-7.2
- [R4DS](https://r4ds.hadley.nz/): chapter 5, chapter 18
- [Dealing with outliers (motivation)](https://www.analyticsvidhya.com/blog/2021/05/detecting-and-treating-outliers-treating-the-odd-one-out/)
- [Dealing with missing data](https://www.analyticsvidhya.com/blog/2021/10/handling-missing-value/)

*You can find examples and motivation in the resources.*

### Overview 

On this page we will go through Exploratory Data Analysis (EDA) and procesessing
data. To do this properly, one has to have a good understanding of the concepts
thought in the previous weeks.

## Exploratory Data Analysis

EDA is the process of systematically generating an understanding of the data
using the tools we have studied. That is, transforming and visualising data. We
have already, unknowingly, performed EDA, for instance, when we use the function
`head`, it gives us a quick glance of the structure of the data. By using
`head`, we have answered the question: *what is the structure of the data?*

Asking questions is key to EDA. That is how we unwrap the complexity of the
data, by asking and answering questions.

> There are no routine statistical questions, only questionable statistical
> routines.” 
>
> — Sir David Cox

*(quote borrowed from [R4DS](https://r4ds.had.co.nz/index.html)*

All questions of the data will lead to some deeper understanding of the data.
What are questions that we can ask (and answer) to fill out the gaps of
knowledge we have about the data? That ofcourse, depends on the data we are
working with. Therefore, performing EDA is not a strict framework, rather a
research methodology based on curiosity. E.g, *can one of the variables explain
the other? Why or why not?*. Answering these type of questions will give us a
deep insight into the data. We will not be able to answer all questions but
knowing what type of questions those are, will give us insight into the limits
of our dataset.

The process of EDA is iterative. Once a set of questions have been answered, new
questions will arise. This continues until there are no more questions to ask or
until you are satisfied with the understanding you have gained. You will get
better and more efficient at posing questions with practice. 

Look at the resources above for examples of EDA.

## Processing Data

### Structuring the Data

There are many ways of structuring the data, some methods are better than
others, this becomes more apparent over time when you work with data. The most
popular format follow these 3 rules:

- Each variable is a column; each column is a variable.
- Each observation is a row; each row is an observation.
- Each value is a cell; each cell is a single value.

Unfortunately, most of the data that you will find is not of this form. To
comply with these rules we will have to wrangle the data in some fashion.
Mostly, by pivoting. Data that are complient with the rules above are often
easier to work with. Furthermore, most libraries work much easier with this
format. As you might have realised, the data that has been used so far is
already of this form and that is because it has processed already. An
added benefit of structuring data in this way is that databases such as SQL,
store data in this form. 

### Cleaning the data

Now, that we have structured our data into a form that easy to work with, we
need to think about cleaning it. In most real world data, there are always some
observations that have errors. For instance, data is missing or the data dosen't
make sense for one reason or the other. To finish processing the data we need to
do a few more things.

#### Missing Data

As you might have noticed already, the data we work with contains missing
values. So far, we have ignored them for the sake of simplicity. However,
ignoring missing values without justification is bad practice. One should always
have a reason for removing data. This requires some thought and analysis, maybe
even a few rounds of [EDA](#exploratory-data-analysis) to really understand the
data. If you have a reasonable guess about the value of the missing data then
*imputing* the value is a fine. If there is no information to be found, then
discarding the entry or variable is fine. Either way, making sure that you
document what and why is important.

#### Outliers 

An outliers is an entry that differs from the other entries significantly, you
will often find these type of values in the data and the reason for the outlier
can vary. For instance, it can be a data entry error, measurement error,
sampling error, processing error and there are ofcourse natural outliers. Many
statistical methods are employed for detecting outliers. We will only employ
[EDA](#exploratory-data-analysis) to detect and delete/transform/impute/accept
outliers. Once again, whatever you choose be transparent and document what you
have done. 

### Remarks

Real world data is often "ugly" and a great amount of work is needed to make it
nice and understandable. Try and think about all the things that you have to
account for when you are working with raw data. For instance, duplicate
observations and so on. Use your best judgement. 

