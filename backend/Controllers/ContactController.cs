using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateContactMessageDto? dto)
    {
        if (dto is null ||
            string.IsNullOrWhiteSpace(dto.Name) ||
            string.IsNullOrWhiteSpace(dto.Email) ||
            string.IsNullOrWhiteSpace(dto.Subject) ||
            string.IsNullOrWhiteSpace(dto.Message))
        {
            return BadRequest(new
            {
                message = "Name, email, subject, and message are required."
            });
        }

        var contactMessage = new ContactMessage
        {
            Name = dto.Name.Trim(),
            Email = dto.Email.Trim(),
            Subject = dto.Subject.Trim(),
            Message = dto.Message.Trim()
        };

        _context.ContactMessages.Add(contactMessage);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Contact message created successfully.",
            data = ToResponseDto(contactMessage)
        });
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var messages = await _context.ContactMessages
            .OrderByDescending(message => message.CreatedAt)
            .Select(message => new ContactMessageResponseDto
            {
                Id = message.Id,
                Name = message.Name,
                Email = message.Email,
                Subject = message.Subject,
                Message = message.Message,
                IsRead = message.IsRead,
                CreatedAt = message.CreatedAt
            })
            .ToListAsync();

        return Ok(messages);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var contactMessage = await _context.ContactMessages.FindAsync(id);

        if (contactMessage is null)
        {
            return NotFound(new
            {
                message = "Contact message not found."
            });
        }

        return Ok(ToResponseDto(contactMessage));
    }

    [HttpPatch("{id:int}/read")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var contactMessage = await _context.ContactMessages.FindAsync(id);

        if (contactMessage is null)
        {
            return NotFound(new
            {
                message = "Contact message not found."
            });
        }

        contactMessage.IsRead = true;
        await _context.SaveChangesAsync();

        return Ok(ToResponseDto(contactMessage));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var contactMessage = await _context.ContactMessages.FindAsync(id);

        if (contactMessage is null)
        {
            return NotFound(new
            {
                message = "Contact message not found."
            });
        }

        _context.ContactMessages.Remove(contactMessage);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Contact message deleted successfully."
        });
    }

    private static ContactMessageResponseDto ToResponseDto(ContactMessage contactMessage)
    {
        return new ContactMessageResponseDto
        {
            Id = contactMessage.Id,
            Name = contactMessage.Name,
            Email = contactMessage.Email,
            Subject = contactMessage.Subject,
            Message = contactMessage.Message,
            IsRead = contactMessage.IsRead,
            CreatedAt = contactMessage.CreatedAt
        };
    }
}
