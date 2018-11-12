/*
  Heavily inspired in gatsby-link
  https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-link/src/index.js
*/

/*global __PATH_PREFIX__ */
import React from "react"
import { Link } from "@reach/router"

export function withPrefix(path) {
  return normalizePath(`${__PATH_PREFIX__}/${path}`)
}

function normalizePath(path) {
  return path.replace(/\/+/g, `/`)
}

const NavLinkPropTypes = {
  activeClassName: PropTypes.string,
  activeStyle: PropTypes.object,
}

// Set up IntersectionObserver
const handleIntersection = (el, cb) => {
  const io = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (el === entry.target) {
        // Check if element is within viewport, remove listener, destroy observer, and run link callback.
        // MSEdge doesn't currently support isIntersecting, so also test for  an intersectionRatio > 0
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          io.unobserve(el)
          io.disconnect()
          cb()
        }
      }
    })
  })
  // Add element to the observer
  io.observe(el)
}

class EstaticoLink extends React.Component {
  constructor(props) {
    super()
    // Default to no support for IntersectionObserver
    let IOSupported = false
    if (typeof window !== `undefined` && window.IntersectionObserver) {
      IOSupported = true
    }

    this.state = {
      IOSupported,
    }
    this.handleRef = this.handleRef.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    // Preserve non IO functionality if no support
    if (this.props.to !== prevProps.to && !this.state.IOSupported) {
      ___loader.enqueue(parsePath(this.props.to).pathname)
    }
  }

  componentDidMount() {
    // Preserve non IO functionality if no support
    if (!this.state.IOSupported) {
      ___loader.enqueue(parsePath(this.props.to).pathname)
    }
  }

  handleRef(ref) {
    this.props.innerRef && this.props.innerRef(ref)

    if (this.state.IOSupported && ref) {
      // If IO supported and element reference found, setup Observer functionality
      /* CHECK WHAT IOS is */
      // handleIntersection(ref, () => {
      //   ___loader.enqueue(parsePath(this.props.to).pathname)
      // })
    }
  }

  defaultGetProps = ({ isCurrent }) => {
    if (isCurrent) {
      return {
        className: [this.props.className, this.props.activeClassName]
          .filter(Boolean)
          .join(` `),
        style: { ...this.props.style, ...this.props.activeStyle },
      }
    }
    return null
  }

  render() {
    const {
      to,
      getProps = this.defaultGetProps,
      onClick,
      onMouseEnter,
      /* eslint-disable no-unused-vars */
      activeClassName: $activeClassName,
      activeStyle: $activeStyle,
      ref: $ref,
      innerRef: $innerRef,
      state,
      replace,
      /* eslint-enable no-unused-vars */
      ...rest
    } = this.props

    const prefixedTo = withPrefix(to)

    return (
      <Link
        to={prefixedTo}
        state={state}
        getProps={getProps}
        innerRef={this.handleRef}
        onMouseEnter={e => {
          // eslint-disable-line
          onMouseEnter && onMouseEnter(e)
          // ___loader.hovering(parsePath(to).pathname)
        }}
        onClick={e => {
          // eslint-disable-line
          onClick && onClick(e)

          if (
            e.button === 0 && // ignore right clicks
            !this.props.target && // let browser handle "target=_blank"
            !e.defaultPrevented && // onClick prevented default
            !e.metaKey && // ignore clicks with modifier keys...
            !e.altKey &&
            !e.ctrlKey &&
            !e.shiftKey
          ) {
            e.preventDefault()

            // Make sure the necessary scripts and data are
            // loaded before continuing.
            navigate(to)
          }

          return true
        }}
        {...rest}
      />
    )
  }
}

EstaticoLink.propTypes = {
  ...NavLinkPropTypes,
  innerRef: PropTypes.func,
  onClick: PropTypes.func,
  to: PropTypes.string.isRequired,
  replace: PropTypes.bool,
}

export default EstaticoLink

export const navigate = (to, options) => {
  window.___navigate(withPrefix(to), options)
}
