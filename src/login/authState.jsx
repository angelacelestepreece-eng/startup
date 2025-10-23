export class AuthState {
    static Unknown = new AuthState('unknown');
    static Authenticated = new AuthState('authenticated');
    static Unathenticated = new AuthState('unauthenticated');

    constructor(name) {
        this.name = name;
    }
}