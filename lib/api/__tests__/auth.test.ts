import { login } from '@/lib/api/auth';

describe('auth API', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn();
  });

  it('posts credentials and returns data when successful', async () => {
    const mockResponse = { token: 'abc123' };
    (fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => mockResponse });

    const result = await login({ email: 'user@example.com', password: 'secret' });

    expect(fetch).toHaveBeenCalledWith('/api/auth/login', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', password: 'secret' }),
    }));
    expect(result).toEqual(mockResponse);
  });

  it('throws an error when response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(login({ email: 'user@example.com', password: 'secret' })).rejects.toThrow('Login failed');
  });
});
