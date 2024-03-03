const test = require('brittle')
const yup = require('yup')
const getYupFields = require('./index.js')

test('basic', async function (t) {
  const schema = yup.object().shape({
    fullname: yup.string().default(null).min(1).max(32).nullable(),
    email: yup.string().min(1).max(255).required(),
    phone: yup.string().default('').min(1).max(255),
    password: yup.string().min(1).max(255).required(),
    repassword: yup.string().oneOf([yup.ref('password')]).required()
  })

  t.alike(getYupFields(schema), [
    {
      name: 'fullname',
      type: 'string',
      required: false,
      default: null,
      nullable: true,
      min: 1,
      max: 32,
      more: null,
      less: null,
      whitelist: null
    },
    {
      name: 'email',
      type: 'string',
      required: true,
      default: undefined,
      nullable: false,
      min: 1,
      max: 255,
      more: null,
      less: null,
      whitelist: null
    },
    {
      name: 'phone',
      type: 'string',
      required: false,
      default: '',
      nullable: false,
      min: 1,
      max: 255,
      more: null,
      less: null,
      whitelist: null
    },
    {
      name: 'password',
      type: 'string',
      required: true,
      default: undefined,
      nullable: false,
      min: 1,
      max: 255,
      more: null,
      less: null,
      whitelist: null
    },
    {
      name: 'repassword',
      type: 'string',
      required: true,
      default: undefined,
      nullable: false,
      min: null,
      max: null,
      more: null,
      less: null,
      whitelist: null
    }
  ])
})

test('basic', async function (t) {
  const schema = yup.object().shape({
    amount1: yup.number().moreThan(0).required(),
    amount2: yup.number().lessThan(0).required(),
    choices: yup.string().oneOf(['A', 'B']).required()
  })

  t.alike(getYupFields(schema), [
    {
      name: 'amount1',
      type: 'number',
      required: true,
      default: undefined,
      nullable: false,
      min: null,
      max: null,
      more: 0,
      less: null,
      whitelist: null
    },
    {
      name: 'amount2',
      type: 'number',
      required: true,
      default: undefined,
      nullable: false,
      min: null,
      max: null,
      more: null,
      less: 0,
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
      whitelist: ['A', 'B']
    }
  ])
})
