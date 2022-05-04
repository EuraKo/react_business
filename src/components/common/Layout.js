function Layout(props) {
	console.log(props);
	return (
		<section className={`content ${props.name}`}>
			<figure></figure>
			<div className='inner'>
				<h1>{props.name}</h1>
				{/* 해당 레이아웃 컴포넌트를 호출하는 부모컴포넌트의 자식 내용 출력 */}
				{props.children}
			</div>
		</section>
	);
}

export default Layout;
