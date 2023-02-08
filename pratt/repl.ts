import expressionParser from "./pratt";

// Run with npx ts-node repl.ts

if (require.main === module) {
  
  console.log("Pratt parser REPL. q to quit.");

  const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const prompt = () => {
    return new Promise((resolve, reject) => {
      readLine.question('> ', (expr:string) => resolve(expr));
    });
  };

  const repl = async () => {
    while (true) {
      const expr = await prompt() as string;
      if (expr.trim() !== 'q') {
        try {
          const value = expressionParser.parse(expr);
          console.log(value);
        } catch (err) {
          console.log((<Error>err).message);
        }
      } else {
        break;
      }
    }
    readLine.close();
  };
  repl();

}