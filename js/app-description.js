document.addEventListener('DOMContentLoaded', function () {
  const appDescriptionToggle = document.querySelector('.app-description-toggle')
  const appDescriptionContent = document.querySelector(
    '.app-description-content'
  )

  const contentIsHidden = () => appDescriptionContent.hidden

  const showDescription = () => {
    appDescriptionContent.hidden = ''
    appDescriptionToggle.classList.add('is-open')
    appDescriptionToggle.setAttribute(
      'aria-label',
      appDescriptionToggle
        .getAttribute('aria-label')
        .replace(/\S+/, appDescriptionToggle.dataset.labelHide)
    )
  }

  const hideDescription = () => {
    appDescriptionContent.classList.add('hidding')
    appDescriptionToggle.classList.remove('is-open')
    appDescriptionToggle.setAttribute(
      'aria-label',
      appDescriptionToggle
        .getAttribute('aria-label')
        .replace(/\S+/, appDescriptionToggle.dataset.labelShow)
    )
    appDescriptionContent.addEventListener(
      'animationend',
      () => {
        appDescriptionContent.hidden = true
        appDescriptionContent.classList.remove('hidding')
      },
      { once: true }
    )
  }

  document.body.addEventListener('click', function (event) {
    if (event.target.closest('.app-description-toggle')) {
      contentIsHidden() ? showDescription() : hideDescription()
    } else {
      !event.target.closest('.app-description') &&
        !contentIsHidden() &&
        hideDescription()
    }
  })

  document.body.addEventListener('keyup', function (event) {
    event.key === 'Escape' && !contentIsHidden() && hideDescription()
  })
})
