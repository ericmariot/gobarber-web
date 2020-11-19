import React, { useState } from 'react';

import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppointment, Section, Appointment, Calendar } from './styles';
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber"/>

          <Profile>
            <img src={user.avatar_url} alt={user.name}/>
            <div>
              <span>Welcome,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower/>
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Scheduled appointments</h1>
          <p>
            <span>Today</span>
            <span>Day 6</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Next appointment</strong>
            <div>
              <img src="https://leaguefeed.net/wp-content/uploads/2020/10/rarest-league-of-legends-icons.jpg" alt="Nome da pessoa"/>

              <strong>Eric Mariot</strong>
              <span>
                <FiClock/>
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://leaguefeed.net/wp-content/uploads/2020/10/rarest-league-of-legends-icons.jpg" alt="Nome da pessoa"/>
                <strong>Eric Mariot</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://leaguefeed.net/wp-content/uploads/2020/10/rarest-league-of-legends-icons.jpg" alt="Nome da pessoa"/>
                <strong>Eric Mariot</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Afternoon</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://leaguefeed.net/wp-content/uploads/2020/10/rarest-league-of-legends-icons.jpg" alt="Nome da pessoa"/>
                <strong>Eric Mariot</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar/>
      </Content>
    </Container>
  );
};

export default Dashboard;
