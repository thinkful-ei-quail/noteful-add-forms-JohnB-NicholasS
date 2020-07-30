import React from 'react'

export default class AppError extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return {hasError: true}
  }

  render() {
    if(this.state.hasError) {
      return (
      <div className="error-handler">Something went wrong!<br /> try refreshing the page.</div>
    )}
    return this.props.children
  }
}