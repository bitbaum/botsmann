import MegaMenu from '@/apps/web/components/nav/MegaMenu';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const item = {
  label: 'Bots',
  path: '/bots',
  children: [
    { label: 'Heidi', path: '/bots/swiss-german-teacher' },
    { label: 'Nerd', path: '/bots/research-assistant' }
  ]
};

describe('MegaMenu', () => {
  it('reveals on hover', () => {
    render(<MegaMenu item={item} />);
    const trigger = screen.getByText('Bots');
    fireEvent.mouseEnter(trigger.parentElement!);
    expect(screen.getByText('Heidi')).toBeInTheDocument();
  });

  it('closes with Escape key', async () => {
    render(<MegaMenu item={item} />);
    const wrapper = screen.getByText('Bots').parentElement!;
    fireEvent.mouseEnter(wrapper);
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByText('Heidi')).not.toBeInTheDocument();
    });
  });

  it('links to route on click', () => {
    render(<MegaMenu item={item} />);
    const link = screen.getByText('Bots');
    expect(link.closest('a')).toHaveAttribute('href', '/bots');
  });
});



