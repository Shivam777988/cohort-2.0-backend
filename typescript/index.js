// const a="world";
// const b=5;
// console.log(a-b);
// const a:string="world";
// const b:number=5;
// console.log(typeof a);
// console.log(typeof b);
// const a:number[]=[1,2,3];
// a.push(4);
// console.log(a);
// function greet(name: string): never {
//     // return "hello"+ name;
//     // throw new Error("This is an error");
// }
// console.log(greet("world"));
// type User={
//     name: string;
//     age: number;
//     isAdmin: boolean;
// }
// const user: User={
//     name:"rajput",
//     age: 25,
//     isAdmin: true
// }
// function greet(data: User): void {
//     console.log("Hello "+ data.name+", your age is "+ data.age + " and you are an admin: "+ data.isAdmin  );
// }
// greet(user);
/**
 * any , Unknown
 */
// let a: unknown
let a;
a = 'hello';
if ((typeof a) === "string")
    console.log(a.toUpperCase());
export {};
//# sourceMappingURL=index.js.map