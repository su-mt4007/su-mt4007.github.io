# Lecture 6 (Combining Data)

### Resources

- [P4DA](https://wesmckinney.com/book/): 8.2-8.3
- [R4DS](https://r4ds.hadley.nz/): 19.1-19.4

*You can find examples and motivation in the resources.*

## Summary

In this lecture, we are discussing joins. Joining tables allow us to combine
different sources of data into a single dataframe. As a data scientist, you will
this happens more often than not. As mentioned previously, data is never nice
and in the form we want to work with, in most cases it is scattered over
multiple data sources, for instance, databases, the internet, experimental data
etc. Joining enables us to combine many datasets into a single one.

## Joins

Join is the operation of combining different tables into a single table. There
are many different types of joins that are relevant an each has the effect of
mutating the table to increase or decrease the number of variables in the final
table. The 4 most common merges we will encounter are `left join`, `right join`,
`inner join` and `outer join` each serving a distinct rule for combining the
tables. The following image illustrates these operations.

![join-venn](https://www.alphacodingskills.com/sql/img/sql-join.PNG)

*Image from: https://www.alphacodingskills.com/sql/img/sql-join.PNG*

Here, we are always working refereing to combining *two* tables. In the case
where there are many more tables to be combined, we can split it up into
combining two tables at a time. 

The most common way to work is to iteratively expand a dataset by combining
other datasets. That is why, we will work `left join` a lot. Nevertheless,
combining the other methods enable us to create more complex combinations of
datasets.

Learning how to join tables naturally allows us to work with SQL type databases.
Joins are essential, when working SQL, since storing data efficently involves
splitting data up into different tables in a certain way. We will discuss more
about this in the comming lecture.

# Lecture 7 (Basics of SQL)

### Resources
- [W3, SQL Basics](https://www.w3schools.com/sql/sql_syntax.asp)
- [R4DS](https://r4ds.hadley.nz/) chapter 19
- SQLite [Python](https://docs.python.org/3/library/sqlite3.html#tutorial), [R](https://solutions.posit.co/connections/db/getting-started/database-queries/)

*You can find examples and motivation in the resources.*

## Summary

In this lecture we will go through the basics of SQL. This includes the basic
syntax for making queries to the database. This includes both retrieving and
storing data in the database.

## SQL 

What is SQL? Structured Query Language (SQL) is a computer language that enables
us to communicate and manipulate SQL databases(db) and it is one of the most widely used
languages for db management. 

There are many flavours (versions) of SQL. However, they all
share the basic syntax as below and often only differ in the way the basic
syntax is extended.

SQL is a Relational Database Management System (RDBMS), meaning that the data is
stored in tables that are seperated based on the scope of the database. A nice
illustration of how data is stored can be seen in the figure below.

<img src="https://r4ds.hadley.nz/diagrams/relational.png" alt="drawing" width="500" style="margin-left:auto;margin-right:auto;"/>

*Image borrowed from:https://r4ds.hadley.nz/*

Here, the tables are seperated to reflect differring objects. We also see that
the tables are linked or *related* to each other through specific variables (*keys*). This
is where the name relational database comes from.

### Basic Syntax

Writing an SQL *query*(a question or a requests) is similiar to speaking with
the database. Once we get a grasp of the basic syntax we will be able to query
the database for data in whatever form that is.

We use `SELECT` to determine the variables we want and `FROM` to specify the
table we want it from. Following the image above, we can make the following query.

```SQL
SELECT carrier, dest, tailnum
FROM flights;
```
**Make sure to end the query with `;`** 

We can use `SELELCT *` to get *all* variables in the table. The query above is
the simplest query one can make in SQL.

We can add a layer of complexity by filtering the table. We can do this by
using the `WHERE` command. Continuing the example, we can make the following query.

```SQL 
SELECT carrier, dest, tailnum
FROM flights
WHERE dest='sweden';
```
Furthermore, we can use the logical operators `AND`, `OR`, `NOT` to perform logical chaining of conditions. The basic syntax is the following.

```SQL 
SELECT variable1, variable2, ... -- * if you want all variables
FROM table
WHERE condition1 AND/OR/NOT condition2 AND/OR/NOT condition3 ...;
```

To aggregate multiple tables into a single table we can use `... JOIN`. The
syntax is similar to the previous lecture. `ON` specifies the key(s) to
join on. Continuing the example above the syntax is the following.

```SQL 
SELECT carrier, dest, tailnum, airlines.names
FROM flights
LEFT JOIN airlines ON flights.carrier = airlines.carrier;
```

Using the syntax described above, we can chain multiple operations to generate
the desired table. You can see more operations on [W3](https://www.w3schools.com/sql/default.asp).

Since the SQL syntax has been adopted by both `pandas` and `tidyverse`, it will
not be difficult to learn the content above. 

### Storing Data

To start storing data, we need to create a table to store it in. We can do this
using the `CREATE` command. The query is as follows. 

```SQL
CREATE TABLE table_name (
  ...
);
```

To our table, we need to add columns (variable), we can do this by specifying
the name of the column and datatype. We can also specify constraints on the
variable. The query is as follows.  

```SQL
CREATE TABLE table_name (
  Variable1 datatype constraint,
  Variable2 datatype constraint,
  ...
);
```

Common constrains are `NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`. There
are more constraints that can be added. They can be found on W3. 

The *unique* identifier (id) of a row should be constrained with `UNIQUE` and it
must also be filled (`NOT NULL`). The `PRIMARY KEY` incorporates both constraints.
Therefore, it is good practice to specify the row id using the `PRIMARY KEY`
constraint. 

An example of creating a table can look something like the following quer
query.

```SQL
CREATE TABLE Persons (
  name VARCHAR(255) NOT NULL,
  age INT,  -- It does not need to be specified
  id_number VARCHAR PRIMARY KEY
);
```

Specific datatypes can be looked up on [W3](https://www.w3schools.com/sql/default.asp).

To change a table that already exists we can use the `ALTER` command. Specific
ways to alter tables can be found on [W3](https://www.w3schools.com/sql/sql_alter.asp).

Putting it all together, the SQL query looks as follows. 

```SQL
CREATE TABLE Persons (
  Name VARCHAR(255) NOT NULL,
  Age INT,  -- It does not need to be specified
  ID_number VARCHAR(255) PRIMARY KEY
);

CREATE TABLE Computers (
  Computer_id INT PRIMARY KEY,
  Model VARCHAR(255),
  Brand VARCHAR(255),
  Owner VARCHAR(255) FOREIGN KEY REFERENCES Persons(ID_number) 
)
```
Here, we create two tables and use `FOREIGN KEY` to link the owner of the
computer to a specific person using the id-number. If we later realise that we
want a person to have a variable specifying occupation, we can use the following
command. 

```SQL
ALTER TABLE Persons
ADD Occupation VARCHAR(255);
```

With a table created, we can add entries to the table. This can be done using
the `INSERT` command. The full syntax looks as follows.

```SQL
INSERT INTO table_name (variable1, variable2, ...)
VALUES (value1, value2, ...)
```

Note that the order of the values should follow the order of the variables.
Furthermore, if the constraints are violated we will get an error. 

In the example above the query may look like

```SQL
INSERT INTO Persons (Name, ID_number)
VALUES ('Taariq', '19000101-xxxx');
```
Since, the Age variable does not need to be filled in, the query will populate
the `Persons` table and have an empty cell for the Age column.

We are only scratching the surface of SQL, there is a lot more to learn.
However, with this basic knowledge we will be able to interact with databases. 
You can find more information in the listed resources (W3). 

**There are various libraries in Python and R to interact with SQL databases. We
will primarily be working with SQLite databases since they are more accessible.
Popular libraries are [sqlite3](https://docs.python.org/3/library/sqlite3.html#tutorial)
for Python and [dbplyr](https://dbplyr.tidyverse.org/articles/dbplyr.html) for
R.** 

# Lecture 8 (RegEx)

### Resources
- [R4DS](https://r4ds.hadley.nz/strings) chapter 14
- [P4DA](https://wesmckinney.com/book/data-cleaning.html#text_string_manip) chapter 7.4
- [RegEx Cheat Sheet](https://www.rexegg.com/regex-quickstart.html)

*You can find examples and motivation in the resources.*

## Summary

In this lecture, we are going to learn how to use RegEx to pattern match
strings. We will see how powerful it is to use RegEx to bulk search for
patterns. It is industry standard and can be used in all of the tools
we have used so far, i.e Git, Python/R and SQL. 

## RegEx

Regular Expressions (RegEx) is a powerful tool used in computer science and
programming for pattern matching within strings. It provides a concise and
flexible means of searching, matching, and manipulating text based on patterns.

A regular expression is a sequence of characters (a type of query) that defines
a search pattern. These patterns can include a variety of elements such as
literal characters, metacharacters (special characters with specific meanings), and
quantifiers (to specify the number of occurrences). Regex is commonly used in
tasks like text searching, validation, and text manipulation.

Before diving in to the syntax of RegEx, let's look at a simple example. 

Consider a scenario where you want to extract email addresses from a text, for
instance the following text. 

> Please contact support@example.com for assistance. For general inquiries, you can email info@company.com.

We can use the following RegEx to extract the emails in this text by matching
them to a specific format.

```regex
\b[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,4}\b
```

The expression above might look daunting but it will make sense when you get
thet gist of RegEx. Lets break down this expression. 

- \b: Word boundary to ensure that the match is a whole word and not part of a
  larger sequence. For instance, `\bcat\b` will match the word *cat* but not
  *scattered*. 
- [\w._%+-]+: Matches the username part of the email address, allowing
  alphanumeric characters, dots, underscores, percent signs, plus signs, and
  hyphens. Here `\w` is a **metacharacter** which is short for `A-Za-z0-9`. `+`
  **outside** of the brackets matches 1 or more of the proceeding character.
- @: Matches the **at** symbol.
- [\w.-]+: Matches the domain name, allowing alphanumeric characters, dots, and
  hyphens.
- \.: Matches the dot before the top-level domain.
- [A-Z|a-z]{2,4}: Matches the top-level domain (eg. .com) with at least two and
  at most 4 characters .
- \b: Word boundary to complete the match.

To summarise The following image illustrates what we have done.

![regex-email](https://kottke.org/plus/misc/images/regex-example.png)

*Image from: https://kottke.org/21/07/a-history-of-regular-expressions-and-artificial-intelligence*

Even if it does not make sense yet that is fine. 

### Basic Syntax

Some important definitions in regex are the following.

#### Literals
Characters in a regex pattern that match themselves. For example, the regex `abc` will match the string "abc" in the input.

#### Metacharacters
Special characters with a specific meaning in regex. Some common metacharacters include:
   - `.` (dot): Matches any single character except a newline.
   - `^`: Anchors the regex at the start of the string.
   - `$`: Anchors the regex at the end of the string.
   - `*`: Matches 0 or more occurrences of the preceding character or group.
   - `+`: Matches 1 or more occurrences of the preceding character or group.
   - `?`: Matches 0 or 1 occurrence of the preceding character or group.
   - `|`: Acts like a logical OR, allowing alternatives. For example, `a|b` matches either "a" or "b".
   - `()`: Groups characters together. For example, `(abc)+` matches one or more occurrences of "abc".

#### Character Classes
   - `[ ]`: Defines a character class. For example, `[aeiou]` matches any vowel.
   - `[^ ]`: Negates a character class. For example, `[^0-9]` matches any non-digit character.

#### Quantifiers
Control the number of occurrences of a character or group.
   - `{n}`: Matches exactly n occurrences.
   - `{n,}`: Matches n or more occurrences.
   - `{n,m}`: Matches between n and m occurrences.

#### Escape sequences
Use a backslash `\` to escape a metacharacter, allowing it to be treated as a literal character. For example, `\.` matches a literal period.

#### Predefined character classes
   - `\d`: Matches any digit (equivalent to `[0-9]`).
   - `\D`: Matches any non-digit.
   - `\w`: Matches any word character (alphanumeric + underscore).
   - `\W`: Matches any non-word character.
   - `\s`: Matches any whitespace character.
   - `\S`: Matches any non-whitespace character.

#### Anchors
Specify the position in the string where a match must occur.
   - `\b`: Word boundary.
   - `\B`: Non-word boundary.
   - `^`: Start of a line.
   - `$`: End of a line.

#### Modifiers
   - `i`: Case-insensitive matching.
   - `g`: Global matching (find all matches, not just the first).

#### Wildcard
`.*` is a common pattern to match any character (except newline) zero or more times.

I strongly believe that you learn regex by examples. So let's look a typical
example of regex.

### Example: Extracting Email Addresses from a List

Suppose you have a list of email addresses:

```txt 
john.doe@example.com
jane.smith@gmail.com 
alice.jones@example.com
bob.miller@yahoo.com
```

Now, let's say you want to extract all the email addresses from the domain
example.com. You can use the following regex:


```regex 
\b[A-Za-z0-9._%+-]+@example\.com\b
```

Explanation:

\b: Word boundary to ensure that we match the entire domain, not just a part of
it. [A-Za-z0-9._%+-]+: Matches the username part of the email address, allowing
letters, numbers, dots, underscores, percent signs, plus signs, and hyphens.
@example\.com: Matches the domain part, specifically example.com.

This pattern will match the following strings.
```
['john.doe@example.com', 'alice.jones@example.com']
```

This is a simple example of regex that is meant to illustrate the
power of it.

### Exercises

Here are some excersises, try them out on your own!

#### Simple Email Validation 
````txt
john.doe@example.com
jane.smith@gmail.com
alice.jones123@yahoo.com
invalid.email@domain
````

Output should be:
```txt
Valid Email Addresses:
- john.doe@example.com
- jane.smith@gmail.com
- alice.jones123@yahoo.com

Invalid Email Addresses:
- invalid.email@domain
```

### Extracting Phone Numbers

````txt 
Phone numbers: 
123-456-7890,
(555) 987-6543, 
9876543210, 555-1234
Invalid: 
12-345-6789, 
555-98765, 
abcdefgh
````

Ouput should be:
```txt
Valid Phone Numbers:
- 123-456-7890
- (555) 987-6543
- 9876543210
- 555-1234

Invalid Phone Numbers:
- 12-345-6789
- 555-98765
- abcdefgh
```
### Extracting HTML Tags and Attributes

```txt
<p class="intro">This is a <strong>sample</strong> paragraph.</p>
<p>No class here.</p>
<div id="container" class="main">
  <h1>Title</h1>
  <p>Content</p>
</div>
```
Output should be: 
```txt
HTML Tags and Attributes:
- <p class="intro">
- <strong>

Attributes in <div>:
- id="container"
- class="main"
```

You can execute RegEx using Python or R. Look at the resources for how to do
this! 

