import { UpdateType, UserData } from "../types/commonTypes";

export const mockValues: UserData = {
    currentColor: 'Black',
    hex: '#000000',
    name: 'NN'
  }
  
export const mockUpdate: UpdateType = jest.fn();