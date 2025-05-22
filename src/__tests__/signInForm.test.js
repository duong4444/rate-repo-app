/* eslint-disable no-unused-vars */
// viết test check điền username,password 
// và nhấn nút sign in sẽ gọi hàm onSubmit với đúng tham số
// {"password": "password", "username": "kalle"}
// tham số truyền vào onSubmit là values (là 1 obj chứa form value)
// fireEvent đc dùng để trigger event 
// ,mock function để check onSubmit có đc gọi ko
// ko cần test Apollo Client , AsyncStorage trong useSignIn
// trích pure code ra thành component và dùng component đó để test
// Formik form submissions là async
//  nên muốn onSubmit đc gọi ngay lập tức sau khi bấm btn là ko thể
// giải quyết vấn đề bằng cách viết async test function 
// dùng "async" keyword và dùng waitFor function 
//waitFor có thể đc dùng để chờ expectations pass
// nếu expectations ko pass trong 1 khg tgian thì waitFor throw Err
// ex how to use it
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../components/SignIn';


describe('SignInForm', () => {
  it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
    const onSubmit = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <SignInForm onSubmit={onSubmit} />
    );

    fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Sign in'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        username: 'kalle',
        password: 'password',
      },expect.any(Object));
    });
  });
});