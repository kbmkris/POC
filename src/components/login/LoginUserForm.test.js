import React from 'react';
import LoginUserForm from './LoginUserForm';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

describe('LoginUserForm Test', () => {
  it('Snapshot - component should render', () => {
    const handleOnChange = jest.fn();
    const handleOnClickLogin = jest.fn();
    const handleOnClickRegister = jest.fn();
    const component = renderer
      .create(
        <LoginUserForm
          emailId = {''}
          password = {''}
          handleOnChange ={handleOnChange}
          handleOnClickLogin={handleOnClickLogin}
          handleOnClickRegister={handleOnClickRegister} />,
      );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe ('Dom validation using enzyme', () => {
  function setup (emailId, password) {
    const props = {
      emailId : emailId,
      password : password,
      handleOnChange : jest.fn,
      handleOnClickLogin : jest.fn(),
      handleOnClickRegister : jest.fn()
    };
    return shallow(<LoginUserForm {...props} />);
  }
  it('check for all elements inside LoginUserForm', () => {
    const wrapper = setup('','');
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h3').text()).toEqual(" Login Form ");
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('button').at(0).text()).toEqual('Login');
    expect(wrapper.find('button').at(1).text()).toEqual('Register');
   });
});
