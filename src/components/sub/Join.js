import Layout from '../common/Layout';
import { useState } from 'react';

function Join() {
	const initVal = {
		userid: '',
	};
	const [val, setVal] = useState(initVal);
	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		// setVal({...val, 'userid':value})
		setVal({ ...val, [name]: value });
	};

	return (
		<Layout name='Join'>
			<form action=''>
				<fieldset>
					<legend>회원가입 폼양식</legend>
					<table border='1'>
						<caption>회원가입 정보 입력</caption>
						<tbody>
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>userid</label>
								</th>
								<td>
									<input
										type='text'
										id='userid'
										name='userid'
										placeholder='아이디를 입력하세요.'
										value={val.userid}
										onChange={handleChange}
									/>
								</td>
							</tr>
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancle' />
									<input type='submit' value='send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Join;
