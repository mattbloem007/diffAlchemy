import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

import StoreContext from '../../context/StoreContext'
import {
	CartCounter,
	Container,
	MenuLink,
	Wrapper
} from './styles'

const useQuantity = () => {
	const { store: {checkout} } = useContext(StoreContext)
	const items = checkout ? checkout.lineItems : []
	const total = reduce(items, (acc, item) => acc + item.quantity, 0)
	return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()

	return(
		<Wrapper>
			<Container>
				<MenuLink to='/'>
					Home
				</MenuLink>
				<MenuLink
					to="/about"
				>
					About
				</MenuLink>
				<MenuLink
					to="/podcast"
				>
					Podcast
				</MenuLink>
				<MenuLink
					to="/blog"
				>
					Blog
				</MenuLink>
				<MenuLink
					to="/portfolio"
				>
					Offerings
				</MenuLink>
				{/*<MenuLink
					to="/products"
				>
					Shop
				</MenuLink>
				<MenuLink to='/cart'>
					{hasItems &&
						<CartCounter>
							{quantity}
						</CartCounter>
					}
					Cart 🛍
				</MenuLink>**/}
			</Container>
		</Wrapper>
	)
}

Navigation.propTypes = {
	siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
	siteTitle: ``,
}

export default Navigation
