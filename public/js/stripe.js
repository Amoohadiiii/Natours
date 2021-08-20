/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51JQADyImqDMG2zMXVtvk2TsMZKBTupP2jWxBwffzM2dvH4t2GhvXsxlk2dGODhNk59rTa9W28ZSPWdaGqF6ByyBw00FYIt5xsW'
  );
  try {
    // 1) Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
