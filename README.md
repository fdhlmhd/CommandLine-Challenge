# Command Line Interface (CLI)

mekanisme interaksi dengan sistem operasi atau perangkat lunak komputer dengan mengetikkan perintah untuk menjalankan tugas tertentu.

ada beberapa framework CLI yaitu 
- Vorpal
- Commander.js
- Caporal
- Seeli ( C. L. I. )

kali ini saya menggunakan caporal
```sh
$ npm install caporal
 
# jika menggunakan yarn (https://yarnpkg.com/lang/en/) 
$ yarn add caporal
```

>Program: a cli app that you can build using Caporal
Command: a command within your program. A program may have multiple commands.
Argument: a command may have one or more arguments passed after the command.
>Options: a command may have one or more options passed after (or before) arguments.

Angled brackets (e.g. <item>) indicate required input. Square brackets (e.g. [env]) indicate optional input.

contoh 
```sh
#!/usr/bin/env node
const prog = require('caporal');
prog
  .version('1.0.0')
  // you specify arguments using .argument()
  // 'app' is required, 'env' is optional
  .command('deploy', 'Deploy an application')
  .argument('<app>', 'App to deploy', /^myapp|their-app$/)
  .argument('[env]', 'Environment to deploy on', /^dev|staging|production$/, 'local')
  // you specify options using .option()
  // if --tail is passed, its value is required
  .option('--tail <lines>', 'Tail <lines> lines of logs after deploy', prog.INT)
  .action(function(args, options, logger) {
    // args and options are objects
    // args = {"app": "myapp", "env": "production"}
    // options = {"tail" : 100}
  });
 
prog.parse(process.argv);
 
// ./myprog deploy myapp production --tail 100
```

untuk argumen yang banyak bisa menambahkan <example...>
```sh
#!/usr/bin/env node
const prog = require('caporal');
prog
  .version('1.0.0')
  .command('deploy', 'Our deploy command')
  // 'app' and 'env' are required
  // and you can pass additional environments
  .argument('<app>', 'App to deploy')
  .argument('<env>', 'Environment')
  .argument('[other-env...]', 'Other environments')
  .action(function(args, options, logger) {
    console.log(args);
    // {
    //   "app": "myapp",
    //   "env": "production",
    //   "otherEnv": ["google", "azure"]
    // }
  });
 
prog.parse(process.argv);
 
// ./myprog deploy myapp production aws google azure
```
you can apply coercion and casting using various validators:
## COERCION AND CASTING use VARIOUS VALIDATOR
- Caporal flags
- Functions
- Array
- RegExp

### FLAG VALIDATOR

> INT (or INTEGER): Check option looks like an int and cast it with parseInt()
FLOAT: Will Check option looks like a float and cast it with parseFloat()
BOOL (or BOOLEAN): Check for string like 0, 1, true, false, on, off and cast it
LIST (or ARRAY): Transform input to array by splitting it on comma
REPEATABLE: Make the option repeatable, eg ./mycli -f foo -f bar -f joe
```sh
#!/usr/bin/env node
const prog = require('caporal');
prog
  .version('1.0.0')
  .command('order pizza')
  .option('--number <num>', 'Number of pizza', prog.INT, 1)
  .option('--kind <kind>', 'Kind of pizza', /^margherita|hawaiian$/)
  .option('--discount <amount>', 'Discount offer', prog.FLOAT)
  .option('--add-ingredients <ingredients>', 'Ingredients', prog.LIST)
  .action(function(args, options) {
    // options.kind = 'margherita'
    // options.number = 1
    // options.addIngredients = ['pepperoni', 'onion']
    // options.discount = 1.25
  });
 
prog.parse(process.argv);
 ```
 ```
// ./myprog order pizza --kind margherita --discount=1.25 --add-ingredients=pepperoni,onion
#!/usr/bin/env node
const prog = require('caporal');
prog
  .version('1.0.0')
  .command('concat') // concat files
  .option('-f <file>', 'File to concat', prog.REPEATABLE)
  .action(function(args, options) {
 
  });
 
prog.parse(process.argv);
 
// Usage:
// ./myprog concat -f file1.txt -f file2.txt -f file3.txt

```


### Function validator

Using this method, you can check and cast user input. Make the check fail by throwing an Error, and cast input by returning a new value from your function.
```sh
#!/usr/bin/env node
const prog = require('caporal');
prog
  .version('1.0.0')
  .command('order pizza')
  .option('--kind <kind>', 'Kind of pizza', function(opt) {
    if (['margherita', 'hawaiian'].includes(opt) === false) {
      throw new Error("You can only order margherita or hawaiian pizza!");
    }
    return opt.toUpperCase();
  })
  .action(function(args, options) {
    // options = { "kind" : "MARGHERITA" }
  });
 
prog.parse(process.argv);
 
// ./myprog order pizza --kind margherita
```

### Array validator
Using an Array, Caporal will check that it contains the argument/option passed.

>Note: It is not possible to cast user input with this method, only checking it, so it's basically only interesting for strings, but a major advantage is that this method will allow autocompletion of arguments and option values.
```sh
#!/usr/bin/env node
const prog = require('caporal');
prog
  .version('1.0.0')
  .command('order pizza')
  .option('--kind <kind>', 'Kind of pizza', ["margherita", "hawaiian"])
  .action(function(args, options) {
 
  });
 
prog.parse(process.argv);
 
// ./myprog order pizza --kind margherita

```
### RegExp validator
Simply pass a RegExp object to test against it. Note: It is not possible to cast user input with this method, only checking it, so it's basically only interesting for strings.
```sh
#!/usr/bin/env node
const prog = require('caporal');
prog
  .version('1.0.0')
  .command('order pizza')
  .option('--kind <kind>', 'Kind of pizza', /^margherita|hawaiian$/)
  .action(function(args, options) {
 
  });
 
prog.parse(process.argv);
 
// ./myprog order pizza --kind margherita
````
