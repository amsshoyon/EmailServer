export interface JwtPayload {
    username: string;
}

export interface UserInterface {
    id: number;
    username: string;
}

export interface UserResponse {
    message: string;
    result: {
        accessToken: string;
        user: UserInterface;
    };
}
