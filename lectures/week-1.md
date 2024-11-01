---
outline: 2
---

# Introduction to Software, GitHub and Markdown

**Resources:**
- [Basics of Markdown](https://www.markdownguide.org/basic-syntax/)
- [More advanced stuff on Markdown](https://www.markdownguide.org/extended-syntax/)
- [Git & Github basic](https://www.w3schools.com/git/git_intro.asp?remote=github)
- [Git & Github Basics, Youtube video (ca 1h)](https://www.youtube.com/watch?v=RGOj5yH7evk)

Use, these resources if you like! they won't contain a lot of new information. Instead,
more in-depth about topics given below.

## Overview

An important aspect of science is reporducibility. Since this course is about
analysing data, it is crucial that the analysis is reproducibile. How else will
you know if my analysis is correct or truthful?

The idea is to use simple tools that take us from raw data to a finished report
simply. In a manner that easy to follow along. We will introduce tools below
that simplify this process greatly and they will be used throughout the course,
including the homework, project and exam. 

Specifically, the tools we will use are `Python`/`R` for programming, `Jupyter
notebook` for analysing text and `Git` together with `Github` for version
control. In combination these are powerful tools that make science accessible
to others as well as reproducible. 

## Preperation

Before we go into details about the tools we will use, some administrative
things need to be done.

Register your github username on the [moodle course
page](https://kurser.math.su.se/course/view.php?id=1333). If you havent created
a github account make sure to do that and register on the moodle page as soon as
possible. This is how we will grade your homework and project. 


Now lets go through the tools and how we can go about installing them one by
one. 

## Git and Github

### What is Git and Github ?

Git is a tool used for version control of software projects, it is also very
common to use Git for easier collaborations in teams for larger projects. You
can find more information about Git [here](https://en.wikipedia.org/wiki/Git).

Github is a cloud-based Git repository. However, it is used for much more than
just version control. Github is a space for developers to share and collaborate
on projects, especially for projects that are a part of the open source
community. It is also space to showcase ones technical ability to employers.
Many developers also use Github as a part of their resume. 

You can also find various open source projects that that are free to use. Be
careful when you use these projects and always make sure that you give proper
credit to the original creator. Being affluent with Github can and will save you
a lot of time. 

We can go on and on about Git but you wont understand it until you use it! So we
will focus on using Git with Github in this course and hopefully you will be
convinced!

### How to install Git and Github Desktop 

By installing Github Desktop you get a Graphical User Interface(GUI) for Git which
automatically connects to your Github account. You can install Github desktop by
Going to [this link](https://desktop.github.com/). Follow the simple
intructions provided! Once you have downloaded and installed Github desktop, open it up and log
into your Github account. Now you should have Git and Github desktop installed.

## Anaconda and Jupyter

Anaconda is one of the most popular platforms for scientific computing. In full, it is a
bundle of various software used in data science, packaged together. Jupyter 
is one of theses programs inlcuded and it is a popular choice for data scientist used for 
developing and presenting data anaylsis. You will use these tools to do the
homework. 

### How to install Anaconda and Jupyter Lab

We are going to install miniconda, which is, just as it is called, a mini
version of Anaconda. To install miniconda, go to the following
[link](https://docs.conda.io/projects/miniconda/en/latest/). Scroll down and
choose the operating system that you have on your computer and follow the
installation instructions.

Once you are done with installing Anaconda(miniconda) we can go ahead and
set up our anaconda environment. To do this you need to work with the command
line interface (CLI) also known as the terminal, which might seem daunting at
first but it is very easy to work with.

The commands inserted into the CLI differs based on the
programming language you choose to use.

Choose the programming language that your are going to use and copy the
appropriate command below and run it in your terminal.

:::code-group
```[Python]
conda config --add channels conda-forge && conda create --name py_env pandas numpy matplotlib jupyterlab -y
```
```[R]
conda config --add channels conda-forge && conda create --name renv r-essentials r-base=4.1.3 -y
```
:::

Anconda works in something called virtual environments which are isolated
instances of your coding setup. You can have multiple enviroment containing for instance
different packages and versions. 

You have now created an enviroment with the specific packages that is needed for
this course. Typically, one uses enviroments for different projects so that your
programming instance do not get bloated with unecessary libraries.

After you have installed the necessary environment we can go ahead and open
jupyter lab by first activating the enviroment we have create using the command

```
conda activate ENV_NAME
```
where `ENV_NAME` is `py_env` and `r_env` for python users and r users
respectively.

Finally, run the command
```
jupyter lab
```
This should open up jupyter lab.

### Jupyter Notebooks 

Jupyter notebooks provide a single document for running code, visaualizing data
and writing in `Markdown`. We will use Markdown in our notebooks to write, it is
very simple to use! You can read more on Markdown in the resources provided
above.

## More on Git 

### Resources
- [Branching & Merging](https://docs.github.com/en/get-started/quickstart/github-flow)
- [.gitignore](https://git-scm.com/docs/gitignore)
- [Forking](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

There are a few more concepts in Git that are important to understand. These are
the following.

### .gitignore

As you might have already seen, when working on project, there are a lot of
unnecessary files that enter the project. For instance, if you use jupyter notebooks, a file named 
`.ipynb_checkpoints` will be generated automatically. In most cases, tracking these types of files 
and/or folders with Git is not needed. To ignore these
particular files and/or folders we can use `.gitignore`. The `.gitignore` file is an index for all the
files and folders you do not wish to track.  

A simple example of a `.gitignore` file, in our example, would be
```
.ipynb_checkpoints
```

Sometimes, it is typical to also ignore the `.gitignore` file. It depends on the
project. You can ignore as many file and folders you deem to be unnecessary to
track.

You can create this file manually, or using Github desktop. Using Github
desktop, in the menu bar, go to `Repository> Repository Settings > Ignored Files`
and list the files and folders you wish to ignore there. If you create the file
manually, make sure to place the `.gitignore` file in the root of you
repository.

You can also right click the file or folder on your Github desktop app, and
select ignore file. 

### Forking vs Cloning

Forking, is a concept that is central to Git. It is the action done on a Git
repository, which creates a copy of a repo and detaches from the original repo. In contrast,
when you clone a repository, you make a copy, but the copy is still linked to
the original repo. 

#### When should I fork a repository?

When you want to make changes to a project that you do not have ownership of,
or, if you want to make your own version of the project and build from the original
project, you can fork the repository and work on your own continued version. Be mindfull of the rights you have to
the code. If the project is open-sourc, there is no issue with forking the
code. However, if this is not the case, it is theft of intellectual property. 

There are many popular projects that are forks. A popular example is Mac OS,
which is a fork of Free-BSD. Mac OS started as a fork of Free-BSD and has now
developed into its own thing.

#### When should i clone a repository?

When you want to make changes to a repository that you have ownership of and you
want the changes to be reflected in the original repository, then you can clone
the repository. For instance, if a new member joins a project, the new member
can clone the project to get a hold of the code.

Although, forking and cloning seem similar, there are small but important
subtleties between them. 

Forking is also very popular when making contributions to open-source
projects. Read more about forking [here](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

### Branches

Branches are one the most important part of Git. During development, you will
most likely encouter a situation where you would like to test a new feature in
your code without changing the original code. Imagine you would like to change
the theme of your website. Since you are in development stages, you don't want
to ruin the original working code in case you decide the feature dosen't work as
intended. A simple solution would be to make a copy of the code and develop your
new feature on the copied code. Git, defines this procedure as branching. The
idea is that you "branch" of from your main code to develop the feature. If you
decide that the feature was a bad idea, you can just delete the branch and jump
to your main branch without changes being made to your main code. On the other
hand, if you decide that the features is good, you can `merge` the new feature
to you main branch. Introducing the branching feature makes it seemless to work
on new features conccurently and also makes collaboration easy. Each team or
member can work on a feature independently.

The following illustration will make this more clear.

![git-branching](https://the-turing-way.netlify.app/_images/sub-branch.png)
image from: [the turing way](https://the-turing-way.netlify.app/reproducible-research/vcs/vcs-git-branches.html).

This image illustrates how the process of branching may look in a project. As
you can see, two features can be developed concurrently without conflicts.
This makes developing features easier as you are not restricted to a single
feature at a time. 

You may have noticed that you are working on the `main` branch of your
repository. This is the default. You can simply create a new branch whenever you
feel like you want to add a feature to your code and don't want to ruin the
original code. This is usually not an issue for very small projects. However, as
your project grows, branching becomes very important.

#### How to create a Git branch

It is simple to create, merge or delete a branch. On Github Desktop, press
on the `Current Branch` tab and select `new branch`. Name it something that makes
sense to the feature you are going to add. Finally, choose the branch
you want base the new branch on, that is, the instance of your code that you want
to branch of from. Note that this only creates a local branch and
you need to `Publish` the new branch if you want it to be seen on Github. 

#### How to merge/delete a branch

On Github desktop, under the `Current branch` tab you will see all the branches of your (local)
repository. To delete a branch, simply right click on the branch and select
`delete`. To merge a branch, under the `Current branch` drop down, there is a
tab called `Pull Requests`, open this tab and in the bottom press the button,
`Chosse a branch to merge into ...`. Finally, chose the branch you want to merge
and press `Create merge commit`. Making a pull requests is synonomous to
creating a request for merging.

If your feature branch is published on Github, you can merge on there as well. Read
more about how to do that [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

## Tieing it together

Now that you have everything installed and hopefully have a basic understanding
of these tools its time to create your first notebook and push it up to your
Github repository. This is part of the homework for this week. Check out
[homework 1](/homework/1).

