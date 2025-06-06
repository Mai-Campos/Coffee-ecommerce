package com.coffee.coffee.services;

import com.coffee.util.dto.AuthenticationRequest;
import com.coffee.util.dto.AuthenticationResponse;

public interface IAuthService {
    AuthenticationResponse login(AuthenticationRequest request);
}
