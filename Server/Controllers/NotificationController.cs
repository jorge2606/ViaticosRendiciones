using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using server.Dto;
using server.IServices;
using server.ServiceResult;
using server.Helpers;
using System.Linq;
using AutoMapper;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotificationController : ControllerBase
    {
        private INotificationService _notificationService;
        private IMapper _mapper;

        public NotificationController(INotificationService notificationService, IMapper mapper)
        {
            _notificationService = notificationService;
            _mapper = mapper;
        }

        [HttpGet("page/{page}")]
        public PagedResult<NotificationDto> NotificationPagination(int? page)
        {
            const int pageSize = 5;
            var queryPaginator = _notificationService.queryableNotifications();

            var result = queryPaginator.Skip((page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PagedResult<NotificationDto>
            {
                List = _mapper.Map<List<NotificationDto>>(result),
                TotalRecords = queryPaginator.Count()
            };
        }

        [HttpGet("GetSomeNotifications")]
        public ActionResult<List<NotificationDto>> GetSomeNotifications()
        {
            return _notificationService.GetSomeNotifications();
        }

        [HttpGet("GetAllNotifications")]
        public ActionResult<List<NotificationDto>> GetAllNotifications()
        {
            return _notificationService.GetAllNotifications();
        }


        [HttpGet("{id}")]
        [AllowAnonymous]
        public ActionResult<List<NotificationDto>> GetNotificationsById(Guid id)
        {
            return _notificationService.GetNotificationsById(id);
        }

        [HttpDelete("Delete/{id}")]
        public ActionResult<List<NotificationDto>> DeleteNotification(Guid id)
        {
            var response = _notificationService.DeleteNotification(id);
            if (!response.IsSuccess)
            {
                return BadRequest(response.Response);
            }

            return Ok(response.Response);
        }

        [HttpPut("NotificationRidden")]
        public IActionResult NotificationRidden(NotificationDto notif)
        {
            var response = _notificationService.NotificationRidden(notif.Id);
            if (!response.IsSuccess)
            {
                return BadRequest(response.Response);
            }

            //response.Response.Colapse = true;
            return Ok(response.Response);

        }


    }

}