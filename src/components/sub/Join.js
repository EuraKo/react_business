import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

// ======= 예시 ===========
//  es6에서 새로나온 문법 키값을 변수로 치환하고싶을때
const abc = 'reading';
const student = {
	age: 20,
	[abc]: 'reading',
};
console.log(student);
// ========= 예시 끝 =========

function Join() {
	const initVal = {
		userid: '',
		email: '',
	};
	const [val, setVal] = useState(initVal);
	const [err, setErr] = useState({});

	const check = (val) => {
		const errs = {};
		if (val.userid.length < 5) {
			errs.userid = '아이디를 5글자이상 입력하새요';
		}
		if (val.email.length < 3 || !/@/.test(val.email)) {
			errs.email = '이메일을 3글자이상 @를 포함하여 입력하세요';
		}
		return errs;
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		// console.log(name, value);
		// setVal({...val, 'userid':value})
		// 그냥 name을 쓰면 키값은 못가져오므로 []로 가져온다. 상단에 예시 있음
		setVal({ ...val, [name]: value });
		console.log(val);
	};

	const handelSubmit = (e) => {
		e.preventDefault();
		setErr(check(val));
	};

	useEffect(() => {
		console.log(err);
	}, [err]);
	return (
		<Layout name='Join'>
			<form onSubmit={handelSubmit}>
				<fieldset>
					<legend>회원가입 폼양식</legend>
					<table border='1'>
						<caption>회원가입 정보 입력</caption>
						<tbody>
							{/* user id */}
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
							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>email</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										placeholder='이메일을 입력하세요.'
										value={val.email}
										onChange={handleChange}
									/>
								</td>
							</tr>
							{/* button set */}
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
