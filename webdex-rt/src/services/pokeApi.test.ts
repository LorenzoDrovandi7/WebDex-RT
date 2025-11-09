import { describe, test, expect, vi, beforeEach } from "vitest";
import { fetchData } from "./pokeApi";

describe("fetchData", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("It returns the JSON data when the response is successful.", async () => {
    const mockJson = { name: "Pikachu" };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockJson),
    });

    vi.stubGlobal("fetch", mockFetch);

    const result = await fetchData<typeof mockJson>("https://pokeapi.co/api/v2/pokemon/pikachu");

    expect(mockFetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/pikachu");

    expect(result).toEqual(mockJson);
  });

  test("It throws an error if the response is not OK.", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: vi.fn(),
    });

    vi.stubGlobal("fetch", mockFetch);

    await expect(fetchData("https://pokeapi.co/api/v2/pokemon/invalid"))
      .rejects.toThrow("Error HTTP: 404");

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
