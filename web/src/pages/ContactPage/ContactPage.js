import BlogLayout from 'src/layouts/BlogLayout'
import {
  Form,
  TextField,
  Submit,
  TextAreaField,
  FieldError,
  Label,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: ContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`
const ContactPage = (props) => {
  const formMethods = useForm({ mode: 'onBlur' })
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      alert('Thank you for your submission')
      formMethods.reset()
    },
  })
  const onSubmit = (data) => {
    create({ variables: { input: data } })
    console.log(data)
  }

  return (
    <BlogLayout>
      <Form
        onSubmit={onSubmit}
        error={error}
        formMethods={formMethods}
        validation={{ mode: 'onBlur' }}
      >
        <Label
          name="name"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', color: 'red' }}
        >
          Name
        </Label>
        <TextField
          name="name"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
          validation={{ required: true }}
        />
        <FieldError name="name" style={{ color: 'red' }} />

        <Label
          name="email"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
        >
          Email
        </Label>
        <TextField
          name="email"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError name="email" style={{ color: 'red' }} />

        <Label
          name="message"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
        >
          Message
        </Label>
        <TextAreaField
          name="message"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
          validation={{ required: true }}
        />
        <FieldError name="message" style={{ color: 'red' }} />

        <Submit style={{ display: 'block' }} disabled={loading}>
          Save
        </Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
