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

  it('closes modal after specified time when autoClose is true', async () => {
    jest.useFakeTimers();

    const { queryByText } = render(
      <Modal
        autoOpen={true}
        autoClose={true}
        closeAfter={3} // Close after 3 seconds
        title="Test Modal"
        text="This is a test modal"
      />
    );

    // Modal content should be visible initially
    expect(queryByText('Test Modal')).toBeInTheDocument();
    expect(queryByText('This is a test modal')).toBeInTheDocument();

    // Advance timers by 3 seconds
    await act(async () => {
      jest.advanceTimersByTime(3000);
      // Wait for the modal content to be removed from the document
      await waitFor(() => {
        expect(queryByText('Test Modal')).not.toBeInTheDocument();
        expect(queryByText('This is a test modal')).not.toBeInTheDocument();
      });
    });
  });

  it('closes modal when overlay or modal container is clicked', async () => {
    const { container, getByText, queryByText } = render(
      <Modal
        autoOpen={true}
        title="Test Modal"
        text="This is a test modal"
      />
    );

    // Click on overlay
    fireEvent.click(container.firstChild);

    // Wait for the modal content to be removed from the document
    await waitFor(() => {
      expect(queryByText('Test Modal')).not.toBeInTheDocument();
      expect(queryByText('This is a test modal')).not.toBeInTheDocument();
    });
  });
});
