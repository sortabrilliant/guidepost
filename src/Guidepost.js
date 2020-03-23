
export const Guidepost = ( props ) => (
	<ul>
		{ props.headings.map( ( heading, index ) => (
			<Node
				key={ index }
				content={ heading.block.content }
				anchor={ heading.block.anchor }
				level={ heading.block.level }
				children={ heading.children }
			/>
		) ) }
	</ul>
);

export const Node = ( props ) => (
	<li>
		<a href={ `#${ props.anchor.replace( '#', '' ) }` } data-level={ props.level }>
			{ props.content }
		</a>
		{ props.children && (
			<Guidepost headings={ props.children } />
		) }
	</li>
);
