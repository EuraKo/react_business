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
		pwd1: '',
		pwd2: '',
	};
	const [val, setVal] = useState(initVal);
	const [err, setErr] = useState({});

	const check = (val) => {
		const errs = {};
		const eng = /[a-bA-Z]/;
		const num = /[0-9]/;
		const spc = /[!@#$%^&*()_+]/;

		if (val.userid.length < 5) {
			errs.userid = '아이디를 5글자이상 입력하새요';
		}
		if (val.email.length < 3 || !/@/.test(val.email)) {
			errs.email = '이메일을 3글자이상 @를 포함하여 입력하세요';
		}
		if (
			val.pwd1.length < 5 ||
			!eng.test(val.pwd1) ||
			!num.test(val.pwd1) ||
			!spc.test(val.pwd1)
		) {
			errs.pwd1 = '비밀번호는 5글자이상 영문,숫자,특수문자를 모두 포함하세요';
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
							{/* pwd1 */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>password</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요'
										value={val.pwd1}
										onChange={handleChange}
									/>
								</td>
							</tr>
							{/* pwd2 */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>re password</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요'
										value={val.pwd2}
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
