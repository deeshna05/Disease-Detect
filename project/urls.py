from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', RedirectView.as_view(url='/ml_app/', permanent=False)),  # Redirect root to ml_app
    path('ml_app/', include('ml_app.urls')),  # Include app's URLs
    path('api/', include('ml_app.urls')),  # Include API URLs (if you want to access like /api/)
]
