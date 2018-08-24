import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tippy'
import { autoFormatDate } from '../../modules/validated-fields'
import InputFieldStyles from './styles'
import { errors, tooltipStyles } from '../../styles'

class InputField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.type || 'text',
    }
    this.showHideMethod = this.showHideMethod.bind(this)
  }

  showHideMethod(e) {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      type: this.state.type === 'password'
        ? 'text'
        : 'password',
    })
  }

  render() {
    const {
      input,
      label,
      className,
      description,
      dateFormat,
      tooltip,
      placeholders,
      emailWrapper,
      activateCodeWrapper,
      passwordConfirmWrapper,
      personalDetailsEmailWrapper,
      autoFocus,
      showHide,
      disabled,
      notValidByDefault,
      meta: {
        touched,
        error,
        warning,
        valid,
      },
    } = this.props

    const classNames = [
      'stv-form-input',
      className,
      touched && error && 'has-error',
      valid && notValidByDefault ? null : 'is-valid',
      valid && showHide && 'is-valid-password',
      touched && error && showHide && 'has-error-password',
    ]
      .filter(Boolean)
      .join(' ')

    const wrapperClassNames = [
      'stv-form-input-wrapper',
      emailWrapper && 'email-wrapper',
      passwordConfirmWrapper && 'password-confirm',
      personalDetailsEmailWrapper && 'personal-details-email-wrapper',
      activateCodeWrapper && '',
    ]
      .filter(Boolean)
      .join(' ')

    const proxyOnBlur = evt => input.onBlur(autoFormatDate(input.value))
    const dobValidator = {
      ...(dateFormat && { onBlur: proxyOnBlur }),
    }
    return (
      <div className={wrapperClassNames}>
        <div>
          {label && <label className="stv-form-label" htmlFor={label}>{label}</label>}
          {
            tooltip &&
            <div className="tooltip-wrapper">
              <Tooltip
                position="bottom"
                trigger="click"
                className="tooltip"
                style={{
                  display: 'inline-block',
                }}
                html={(
                  <div className="tooltip-content">
                    <p className="stv-input-description">There are some shows on the STV Player that you can only watch if you
                      live in one of our license regions.
                      Your postcode is a simple and easy way for us to check this.
                    </p>
                    <div className="stv-form-button">Okay</div>
                  </div>
                )}
              >
                <p className="tooltip-text">i</p>
              </Tooltip>
            </div>
          }
          {description && <div className="stv-input-description">{description}</div>}
          <div>
            <input
              {...input}
              {...dobValidator}
              type={this.state.type}
              placeholder={placeholders}
              className={classNames}
              autoFocus={autoFocus}
              disabled={disabled}
            />
            {showHide &&
              <a
                className="password-show"
                onClick={this.showHideMethod}
                role="none"
                onKeyPress={this.showHideMethod}
              >
                {
                  this.state.type === 'password'
                    ? 'Show'
                    : 'Hide'
                }
              </a>}
          </div>
          <div className="error-wrapper">
            {touched &&
              ((error && <span className="error">{error}</span>) ||
                (warning && <span className="error">{warning}</span>))}
          </div>
        </div>
        <style jsx>{InputFieldStyles}</style>
        <style jsx>{errors}</style>
        <style jsx>{tooltipStyles}</style>
      </div>
    )
  }
}

export default InputField

InputField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onBlur: PropTypes.func,
  }),
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.string,
  placeholders: PropTypes.string,
  dateFormat: PropTypes.bool,
  tooltip: PropTypes.bool,
  showHide: PropTypes.bool,
  emailWrapper: PropTypes.bool,
  personalDetailsEmailWrapper: PropTypes.bool,
  passwordConfirmWrapper: PropTypes.bool,
  activateCodeWrapper: PropTypes.bool,
  notValidByDefault: PropTypes.bool,
  autoFocus: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
  disabled: PropTypes.bool,
}

InputField.defaultProps = {
  input: {
    value: '',
    onBlur: () => { },
  },
  label: '',
  type: 'input',
  className: 'stv-form-input',
  description: '',
  placeholders: '',
  tooltip: false,
  dateFormat: false,
  showHide: false,
  emailWrapper: false,
  personalDetailsEmailWrapper: false,
  passwordConfirmWrapper: false,
  activateCodeWrapper: false,
  disabled: false,
  autoFocus: false,
  notValidByDefault: false,
  meta: {
    touched: null,
    error: 'error message',
    warning: 'warning message',
  },
}
