import { fetchRequests, createRequest } from '@/lib/api/request';
import { DesignRequest } from '@/types';

describe('request API', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn();
  });

  it('fetchRequests returns data on success', async () => {
    const mockData: DesignRequest[] = [
      {
        id: '1',
        clientId: 'client1',
        title: 'Logo',
        description: 'Create a logo',
        category: 'Logo Design',
        status: 'pending',
        priority: 'medium',
        deadline: '2024-01-01',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
    ];
    (fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => mockData });

    const result = await fetchRequests();
    expect(fetch).toHaveBeenCalledWith('/api/requests');
    expect(result).toEqual(mockData);
  });

  it('fetchRequests throws when response not ok', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });
    await expect(fetchRequests()).rejects.toThrow('Failed to fetch requests');
  });

  it('createRequest posts data and returns result', async () => {
    const newRequest = { title: 'Site', description: 'Build site' } as Partial<DesignRequest>;
    const created: DesignRequest = {
      id: '2',
      clientId: 'client1',
      title: 'Site',
      description: 'Build site',
      category: 'Web Design',
      status: 'pending',
      priority: 'medium',
      deadline: '2024-02-01',
      createdAt: '2023-02-01',
      updatedAt: '2023-02-01',
    };
    (fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => created });

    const result = await createRequest(newRequest);
    expect(fetch).toHaveBeenCalledWith('/api/requests', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRequest),
    }));
    expect(result).toEqual(created);
  });

  it('createRequest throws when response not ok', async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });
    await expect(createRequest({ title: 'Test' } as Partial<DesignRequest>)).rejects.toThrow('Failed to create request');
  });
});
