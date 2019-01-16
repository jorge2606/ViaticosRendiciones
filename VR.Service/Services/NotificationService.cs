﻿using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Audit.Data;
using AutoMapper;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Service.Interfaces;
using NotificationType = Service.Common.ServiceResult.NotificationType;

namespace VR.Service.Services
{
    public class NotificationService : INotificationService
    {
        private DataContext _contextNotification;
        private AuditContext _contextAudit;
        private IMapper _mapper;
   
        public NotificationService(DataContext context, IMapper mapper,
        AuditContext auditContext)
        {
            _contextNotification = context;
            _contextAudit = auditContext;
            _mapper = mapper;
        }



        public IQueryable<Notification> queryableNotifications()
        {
            var usersPaginator = _contextNotification.Notifications.OrderBy(x => x.CreationTime);
            return usersPaginator;
        }

        public ActionResult<List<NotificationDto>> GetSomeNotifications()
        {
            return _contextNotification.Notifications.OrderBy(x => x.CreationTime).Select(_mapper.Map<NotificationDto>).
                Take(5).ToList();
        }

        public ActionResult<List<NotificationDto>> GetAllNotifications()
        {
            return _contextNotification.Notifications.Select(_mapper.Map<NotificationDto>).ToList();
        }


        public ActionResult<List<NotificationDto>> GetNotificationsById(Guid id)
        {
            return _contextNotification.Notifications.Select(_mapper.Map<NotificationDto>).
                    Where(x => x.Id == id).
                    Take(2).ToList();
            
        }

        public ServiceResult<NotificationDto> NotificationRidden(Guid id)
        {
            var notif = _contextNotification.Notifications.FirstOrDefault(x => x.Id == id);
            
            if (notif == null)
            {
                return new ServiceResult<NotificationDto>(null);
            }

            //siempre que ingrese a este metodo va a ser como leido
            notif.Read = true;
         
            _contextNotification.Notifications.Update(notif);
            _contextNotification.SaveChanges();

            return new ServiceResult <NotificationDto>(_mapper.Map<NotificationDto>(notif));

        }

        public ServiceResult<NotificationDto> DeleteNotification(Guid id)
        {
            var notif = _contextNotification.Notifications.FirstOrDefault(x => x.Id == id);

            if (notif == null)
            {
                return new ServiceResult<NotificationDto>(null);
            }
            _contextNotification.Notifications.Remove(notif);
            _contextNotification.SaveChanges();

            return new ServiceResult<NotificationDto>(_mapper.Map<NotificationDto>(notif));

        }

        public ServiceResult<CreateNotificationDto> Create(CreateNotificationDto create)
        {
            if (create == null)
            {
                return new ServiceResult<CreateNotificationDto>(null);
            }
            

            Notification newNotification = new Notification()
            {
                Id = new Guid(),
                UserId = create.UserId,
                NotificationType = create.NotificationType,
                CreationTime = create.CreationTime,
                Tittle = create.Tittle,
                CreatorUserId = create.CreatorUserId,
                EntityId = create.EntityId,
                LastModificationTime = create.LastModificationTime,
                LastModifierUserId = create.LastModifierUserId,
                Read = false,
                TextData = create.TextData,
               
            };

            _contextNotification.Notifications.Add(newNotification);
            _contextNotification.SaveChanges();

            return new ServiceResult<CreateNotificationDto>(create);
        }


    }
}
