import {parse} from "ast";

let template = `
<div>
    <h3>hello title {{message}}</h3>
    <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
    </ul>
</div>
`
let data = {
  message: 'this is a text message'
}
let ast = parse(template, data)
console.log(ast)