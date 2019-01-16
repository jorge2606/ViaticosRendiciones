using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Linq;
using Service.Common.ServiceResult;
using VR.Data.Model;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface INotificationService
    {
        ActionResult<List<NotificationDto>> GetSomeNotifications();
        ActionResult<List<NotificationDto>> GetAllNotifications();
        ActionResult<List<NotificationDto>> GetNotificationsById(Guid id);
        ServiceResult<NotificationDto> NotificationRidden(Guid id);
        ServiceResult<NotificationDto> DeleteNotification(Guid id);
        IQueryable<Notification> queryableNotifications();
        ServiceResult<CreateNotificationDto> Create(CreateNotificationDto create);
    }
}
