//nodemailerService.sendEmail = emailServiceMock.sendEmail
//nodemailerService.sendEmail = jest.fn()
nodemailerService.sendEmail = jest.fn().mockImplementation((email: string, code: string, template: (code: string) => string) => true);
const registrationUserUseCase = authService.registerUser;

it.skip('should register user with correct data', async () => {
    const {login, pass, email} = testSeeder.createUserDto();
    const result = await registrationUserUseCase(login, pass, email);
    expect(result.status).toBe(ResultStatus.Success);
    expect(nodemailerService.sendEmail).toBeCalled()
    expect(nodemailerService.sendEmail).toBeCalledTimes(1)
})

it.skip('should not register user twice', async () => {
    const {login, pass, email} = testSeeder.createUserDto();
    await testSeeder.registerUser({login, pass, email});
    const result = await registrationUserUseCase(login, pass, email);
    expect(result.status).toBe(ResultStatus.BadRequest);
})