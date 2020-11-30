import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user } = useAuth();

  const  handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('A valid e-mail is required ').email('Type a valid e-mail'),
        password: Yup.string().min(6, 'Mininum of 6 digits'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Register completed!',
        description: 'You can already login on GoBarber!.',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      // disparar um toast
      addToast({
        type: 'error',
        title: 'Register error',
        description: 'An error has occured while making your register, check your credentials and try again.',
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form ref={formRef} initialData={{
          name: user.name,
          email: user.email,
        }}
        onSubmit={handleSubmit}>
          <AvatarInput>
            <img src="https://image.freepik.com/fotos-gratis/gato-malhado-bebe-gatinho-bonito_44074-3686.jpg" alt={user.name}/>
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>My profile</h1>

          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input containerStyle={{ marginTop:24 }} name="old_password" icon={FiLock} type="password" placeholder="Password" />
          <Input name="password" icon={FiLock} type="password" placeholder="New password" />
          <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Password confirmation" />

          <Button type="submit">Confirm changes</Button>
        </Form>
      </Content>
    </Container>
  )
};

export default Profile;
