using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using server.Dto;
using System;
using server.ServiceResult;
using System.Linq;
using server.models;

namespace server.IServices
{
    public interface INotificationService
    {
        ActionResult<List<NotificationDto>> GetSomeNotifications();
        ActionResult<List<NotificationDto>> GetAllNotifications();
        ActionResult<List<NotificationDto>> GetNotificationsById(Guid id);
        ServiceResult<NotificationDto> NotificationRidden(Guid id);
        ServiceResult<NotificationDto> DeleteNotification(Guid id);
        IQueryable<Notification> queryableNotifications();
    }
}
