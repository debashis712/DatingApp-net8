using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await userRepository.GetUsersAsync();
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUsers(string username)
        {
            var user = await userRepository.GetUserByUsernameAsync(username);
            return user == null ? NotFound() : user;
        }
    }
}
