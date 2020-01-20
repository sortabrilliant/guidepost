import { Component } from '@wordpress/element';

export default class Node extends Component {
	render() {
		let childnodes = null;

		if ( this.props.children ) {
			childnodes = this.props.children.map( function( childnode ) {
				return (
					<Node key={ childnode.block.anchor } node={ childnode.block } children={ childnode.children } />
				);
			} );
		}

		return (
			<li key={ this.props.node.anchor }>
				<a href={ this.props.node.anchor } data-level={ this.props.node.level }>{ this.props.node.content }</a>
				{ childnodes ? <ul>{ childnodes }</ul> : null }
			</li>
		);
	}
}
