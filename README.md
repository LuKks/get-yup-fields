# get-yup-fields

Get fields from a yup schema

```
npm i get-yup-fields
```

## Usage

```js
const yup = require('yup')
const getYupFields = require('get-yup-fields')

const schema = yup.object().shape({
  amount: yup.number().min(0.01).max(100).required(),
  choices: yup.string().oneOf(['A', 'B']).required()
})

console.log(getYupFields(schema)) /* => [
  {
    name: 'amount',
    type: 'number',
    required: true,
    default: undefined,
    nullable: false,
    min: 0.01,
    max: 100,
    more: null,
    less: null,
    whitelist: null
  },
  {
    name: 'choices',
    type: 'string',
    required: true,
    default: undefined,
    nullable: false,
    min: null,
    max: null,
    more: null,
    less: null,
    whitelist: [ 'A', 'B' ]
  }
] */
```

## License

MIT
