import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A first meetup',
//     image:
//       'https://d2bgjx2gb489de.cloudfront.net/gbb-blogs/wp-content/uploads/2017/10/23215800/Panorama-M%C3%BCnchen_XXL.jpg',
//     address: 'Some Address 5, 12345 Some City',
//     description: 'This is a first meetup!',
//   },
//   {
//     id: 'm2',
//     title: 'A second meetup',
//     image:
//       'https://d2bgjx2gb489de.cloudfront.net/gbb-blogs/wp-content/uploads/2017/10/23215800/Panorama-M%C3%BCnchen_XXL.jpg',
//     address: 'Some Address 10, 12345 Some City',
//     description: 'This is a second meetup!',
//   },
// ];

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

// export const getServerSideProps = async (context) => {
//   // fetch data from api
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://idriz:MongoDB123@cluster0.co83n.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
