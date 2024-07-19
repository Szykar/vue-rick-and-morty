import axios from 'axios'
import type { ApiCharactersResponse, Character } from '@/types/rickAndMorty'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

export const getCharacters = async (
  page: number,
  name?: string,
  status?: string
): Promise<ApiCharactersResponse> => {
  const response = await axios.get<ApiCharactersResponse>(`${API_BASE_URL}/character`, {
    params: { page, name, status }
  })
  return response.data
}

export const getCharacter = async (id: number): Promise<Character> => {
  const response = await axios.get<Character>(`${API_BASE_URL}/character/${id}`)
  return response.data
}
