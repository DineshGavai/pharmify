from django.forms import ModelForm,DateInput
from .models import Medicines


class AddStockForm(ModelForm):
    class Meta:
        model=Medicines
        fields="__all__"
        exclude=['user']
        widgets = {
            'manufacture_date': DateInput(attrs={'type': 'date'}),
            'expiry_date': DateInput(attrs={'type': 'date'}),
        }