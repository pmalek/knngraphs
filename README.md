knngraphs
=========

Project showing correlation between k parameter in kNN graphs and Pearson's Correlation Coefficient

Building
--------

To build this project please first clone it using:

```sh
git clone https://github.com/pmalek/knngraphs.git
```

and then go to the root directory of the project:

```sh
cd knngraphs
```

and build it using maven:

```sh
mvn compile
```

To package the project to a .jar file use:

```sh
mvn package
```

Usage
-----

After building the `.jar` you can use it by:

```sh
java -jar target/knngraphs-1.0-SNAPSHOT-jar-with-dependencies.jar file1.csv file2.csv
```

