import { compose } from 'redux'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import React, { Component } from 'react'
import PersonalDetailsStyles from '../PersonalDetails/styles'
import InputField from '../../components/InputField'
import { getCurrentDomain } from '../../modules/utils'
import { updateUser } from '../../aws/cognito'
import {
  getAllowedDateValidator,
  isRequired,
  isMinLength2,
  isValidPostcode,
  stripOutWhitespace,
  normalizePostcode,
  isEmailAddress,
} from '../../modules/validated-fields'

const currentDomain = getCurrentDomain()

class PersonalDetails extends Component {
  state = {
    nameChanged: false,
    lastNameChanged: false,
    dobChanged: false,
    postCodeChanged: false,
  }
  componentDidMount() {
    const { user, initialize } = this.props
    initialize(this.mapUserToForm(user))
  }

  getFormattedUserObj = () => {
    const {
      email,
      given_name,
      family_name,
      birthdate,
      address,
    } = this.props.user
    return {
      email,
      given_name,
      family_name,
      birthdate,
      address,
    }
  }

  mapUserToForm = ({
    email,
    given_name,
    family_name,
    birthdate,
    address,
  }) => (
    {
      emailValue: email,
      firstNameValue: given_name,
      lastNameValue: family_name,
      dobValue: birthdate,
      postcodeValue: address.formatted,
    }
  )

  mapFormToUser = ({
    emailValue,
    firstNameValue,
    lastNameValue,
    dobValue,
    postcodeValue,
  }) => (
    {
      email: emailValue,
      given_name: firstNameValue,
      family_name: lastNameValue,
      birthdate: dobValue,
      address: {
        formatted: postcodeValue,
      },
    }
  )

  compareUserValues = (values) => {
    const updatedUser = this.mapFormToUser(values)
    const originalUser = this.getFormattedUserObj()

    return Object.keys(updatedUser).reduce((changedValues, key, index) => {
      const updatedValue = updatedUser[key]
      const originalValue = originalUser[key]
      if (updatedValue.formatted) { // check if postcode has changed.
        if (updatedValue.formatted !== originalValue.formatted) {
          return {
            ...changedValues,
            address: updatedValue.formatted,
          }
        }
        return changedValues
      }
      if (updatedValue !== originalValue) {
        return {
          ...changedValues,
          [key]: updatedUser[key],
        }
      }
      return changedValues
    }, {})
  }

  updateUser = (values) => {
    const userValues = this.compareUserValues(values)
    updateUser(userValues)
      .then((result) => {
        // Handle success user feedback.
        console.log('success: ', result)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    /* TODO
     - remove valid class by default
     - disable email input */

    const {
      submitting,
      pristine,
      handleSubmit,
    } = this.props
    const {
      nameChanged,
      lastNameChanged,
      dobChanged,
      postCodeChanged,
    } = this.state

    const ButtonStateClasses = [
      'stv-form-button',
      (pristine || submitting) && 'disabled',
    ]
      .filter(Boolean)
      .join(' ')
    return (
      <div className="personal-details">
        <h2 className="join-heading">Personal Details </h2>
        <p className="join-info">
          These are the details you gave us when you signed up. If you need to update them,
          just make the changes and hit Save. You can also
          delete your account using the link below.
        </p>
        <p><strong>IMPORTANT:</strong> Find out how we <a href={`https://my.${currentDomain}/stv-and-you`} rel="noreferrer noopener" target="_blank">use your information</a> responsibly.</p>

        <form onSubmit={handleSubmit(this.updateUser)}>
          <div>
            <Field
              name="emailValue"
              type="email"
              component={InputField}
              label="Email Address"
              description="You will need this to sign back in later so please take care to get it right"
              validate={[isRequired, isEmailAddress]}
              personalDetailsEmailWrapper
              disabled
              notValidByDefault
            />
            <div className="wrap-text-row">
              {nameChanged ?
                <Field
                  name="firstNameValue"
                  type="text"
                  component={InputField}
                  label="First Name"
                  validate={[isRequired, isMinLength2]}
                /> :
                <Field
                  name="firstNameValue"
                  type="text"
                  component={InputField}
                  label="First Name"
                  validate={[isRequired, isMinLength2]}
                  notValidByDefault
                  onChange={() => this.setState({ nameChanged: true })}
                />
              }

              {lastNameChanged ?
                <Field
                  name="lastNameValue"
                  type="text"
                  component={InputField}
                  label="Last Name"
                  validate={[isRequired, isMinLength2]}
                /> :
                <Field
                  name="lastNameValue"
                  type="text"
                  component={InputField}
                  label="Last Name"
                  validate={[isRequired, isMinLength2]}
                  notValidByDefault
                  onChange={() => this.setState({ lastNameChanged: true })}
                />
              }

            </div>
            <div className="wrap-text-column">
              <Field
                name="dobValue"
                type="dob"
                description="You must be over 16 to join STV."
                component={InputField}
                label="Date of Birth"
                validate={[isRequired, getAllowedDateValidator(16, 104)]}
                normalize={stripOutWhitespace}
                dateFormat
              />
              {postCodeChanged && dobChanged ?
                <Field
                  name="postcodeValue"
                  type="postcode"
                  tooltip
                  description="We need to check that you live in an STV region."
                  component={InputField}
                  label="Postcode"
                  validate={[isRequired, isValidPostcode]}
                  normalize={value => normalizePostcode(value).toUpperCase()}
                /> :
                <Field
                  name="postcodeValue"
                  type="postcode"
                  tooltip
                  description="We need to check that you live in an STV region."
                  component={InputField}
                  label="Postcode"
                  validate={[isRequired, isValidPostcode]}
                  normalize={value => normalizePostcode(value).toUpperCase()}
                  notValidByDefault
                  onChange={() => this.setState({ postCodeChanged: true })}
                />
              }
            </div>
          </div>
          <div className="button-wrapper">
            <button
              type="submit"
              disabled={pristine || submitting}
              className={ButtonStateClasses}
            >
              Save
            </button>
          </div>
        </form>
        <style jsx>{PersonalDetailsStyles}</style>
      </div>
    )
  }
}
PersonalDetails.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  initialize: PropTypes.func.isRequired,
  user: PropTypes.shape({
    dobValue: PropTypes.string,
    birthdate: PropTypes.string,
    passwordValue: PropTypes.string,
    firstNameValue: PropTypes.string,
    LastNameValue: PropTypes.string,
    given_name: PropTypes.string.isRequired,
    family_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    postcodeValue: PropTypes.string,
    address: PropTypes.shape({
      formatted: PropTypes.string,
    }),
  }),
}

PersonalDetails.defaultProps = {
  handleSubmit: () => { },
  pristine: true,
  submitting: false,
  user: {
    dobValue: '01/01/1970',
    birthdate: '01/01/1970',
    firstNameValue: 'new',
    passwordValue: '******',
    LastNameValue: 'user',
    postcodeValue: 'G511PQ',
    given_name: 'Mac',
    family_name: 'Ronald',
    address: {
      formatted: 'G511PQ',
    },
  },
}
export default compose(reduxForm({
  form: 'PersonalDetailsForm',
  destroyOnUnmount: true,
}))(PersonalDetails)
