import Head from 'next/head';
import router from 'next/router';
import React, { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log(data);
    router.push('/');
  };

  return (
    <Fragment>
      <Head>
        <title>Add new meetup</title>
        <meta name='description' content='Add your own meetups' />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
