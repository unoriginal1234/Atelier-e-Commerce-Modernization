/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor, act} from '@testing-library/react';
import '@testing-library/jest-dom'
import Modal from '../Modal.jsx';


describe('Modal Component', () => {
  it('renders modal with provided props', async () => {
    const { getByText } = render(
      <Modal
        autoOpen={true}
        title="Test Modal"
        text="This is a test modal"
      />
    );

    // Wait for the modal content to be rendered
    await waitFor(() => {
      expect(getByText('Test Modal')).toBeInTheDocument();
      expect(getByText('This is a test modal')).toBeInTheDocument();
    });
  });
});

