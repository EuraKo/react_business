import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
const path = process.env.PUBLIC_URL;

function Flickr() {
	return <Layout name={'Flickr'} bg={`${path}/img/man1.jpg`}></Layout>;
}

export default Flickr;
